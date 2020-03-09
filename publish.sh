#!/bin/bash
set -e

# Force script to run even if not a master branch
# used to deploy an experimental branch (rare)
force="n"

# Add a commit capturing version changes after publishing
# Commit will automatically be pushed
commit="y"

# Push resulting build to npm
# Turning this off is helpful for experments involving this script
publish="y"

# Run a clean build before publishing
# Turning this off may be helpful if script errors out in later steps
build="y"

# Run a fresh npm i install before building/publishing
# Turning this off may be helpful when you know your deps are updated
# or you want to use a different dep client
install="y"

# Modify the version number before publishing
# Turning this off may be helpful if a previous deploy failed, but
# the deployment number is still set from the previous run
bumpVersion="y"

# The following processes the command line arguments
POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"
case $key in
    -v|--bump-version)
    bumpVersion="$2"
    shift # past argument
    shift # past value
    ;;
    -i|--install)
    install="$2"
    shift # past argument
    shift # past value
    ;;
    -b|--build)
    build="$2"
    shift # past argument
    shift # past value
    ;;
    -p|--publish)
    publish="$2"
    shift # past argument
    shift # past value
    ;;
    -f|--force)
    force="$2"
    shift # past argument
    shift # past value
    ;;
    -s|--commit)
    commit="$2"
    shift # past argument
    shift # past value
    ;;
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters
# --- end command line parsing ---
# ensure we are on master before continuing
branchName=$(git branch | sed --quiet 's/* \(.*\)/\1/p')
if [[ "$branchName" != "master" && "$force" == "n" ]] ; then
  echo "Can only publish on master branch...exiting"
  exit 1
fi

# Grabbed the following choice function and options selector off of stackoverflow
# https://serverfault.com/questions/144939/multi-select-menu-in-bash-script
choice () {
    local choice=$1
    if [[ ${opts[choice]} ]] # toggle
    then
        opts[choice]=
    else
        opts[choice]=+
    fi
}


containsElement () {
   local array="$1[@]"
    local seeking=$2
    found=1
    for element in "${!array}"; do
        if [[ $element == "$seeking" ]]; then
            found=0
            break
        fi
    done
}

# Ask the user to specify which libs they want to publish
PS3='Please select libs to publish: '
while :
do
    clear
    options=("Forms ${opts[0]}" "Material Deps ${opts[1]}" "Material Renderer ${opts[2]}" "Done")
    select opt in "${options[@]}"
    do
        case $opt in
            "Forms ${opts[0]}")
                choice 0
                break
                ;;
            "Material Deps ${opts[1]}")
                choice 1
                break
                ;;
            "Material Renderer ${opts[2]}")
                choice 2
                break
                ;;
            "Done")
                break 2
                ;;
            *) printf '%s\n' 'invalid option';;
        esac
    done
done

for opt in "${!opts[@]}"
do
    if [[ ${opts[opt]} ]]
    then
      libListing[${#libListing[@]}]=${options[opt]:0:-2}
    fi
done

# turn options into variables
containsElement libListing "Forms"
containsForms=$found
containsElement libListing "Material Deps"
containsMatDeps=$found
containsElement libListing "Material Renderer"
containsMatRenderer=$found

# Grab new version numbers from user
if [ $containsForms -eq 0 ] ; then
  echo "New version number for Forms: "
  read formsVersion
fi
if [ $containsMatDeps -eq 0 ] ; then
  echo "New version number for Material Deps: "
  read matDepsVersion
fi
if [ $containsMatRenderer -eq 0 ] ; then
  echo "New version number for Mat Renderer: "
  read matRendererVersion
fi

# Determine what to install
# If lib list contains forms or material-renderer
# Install libs for forms
npm i

if [[ $containsForms -eq 0 || $containsMatRenderer -eq 0 ]] ; then
  pushd 'libs/forms'
  if [[ $install == "y" ]] ; then
    npm i
  fi
    # While we are here, bump forms version number and build
  if [[ $containsForms -eq 0 && $bumpVersion == "y" ]] ; then
    npm version $formsVersion --allow-same-version
  fi

  if [[ $build == "y" ]] ; then
    ng build forms
  fi
  popd
fi

# If lib list contains mat-deps or material-renderer
# Intall libs for mat-deps
if [[ $containsMatDeps -eq 0 || $containsMatRenderer -eq 0 ]] ; then
  pushd 'libs/material-deps'
  if [[ $install == "y" ]] ; then
    npm i
  fi
  # While we are here bump mat deps version number and build
  if [[ $containsMatDeps -eq 0 && $bumpVersion == "y" ]] ; then
    npm version $matDepsVersion --allow-same-version
  fi
  if [[ $build == "y" ]] ; then
    ng build material-deps
  fi
  popd
fi

# if lib list contains material-renderer
# Install libs for material-renderer
if [ $containsMatRenderer -eq 0 ]; then
  pushd 'libs/renderers/material-renderer'
    if [[ $install == "y" ]] ; then
      npm i
    fi

    # Set mat renderer's new version number
    if [ $bumpVersion == "y" ]; then
      npm version $matRendererVersion --allow-same-version
    fi

    if [[ $build == "y" ]] ; then
      # perform the build
      ng build material-form-renderer
    fi
  popd

  pushd 'dist/libs/renderers/material-renderer'
    # Update the version number of its local deps
    if [ $containsForms -eq 0 ]; then
      sed -i "/incrudable\/forms/s/\"file:.*\"/\"$formsVersion\"/" package.json
    fi
    if [ $containsMatDeps -eq 0 ]; then
      sed -i "/incrudable\/material-deps/s/\"file:.*\"/\"$matDepsVersion\"/" package.json
    fi
  popd

fi

# Deploy listed libs
if [[ "$publish" == 'y' ]] ; then
  if [ $containsForms -eq 0 ] ; then
    pushd 'dist/libs/forms'
    sed -i "/prepublishOnly/d" package.json
    npm publish
    popd
  fi
  if [ $containsMatDeps -eq 0 ] ; then
    pushd 'dist/libs/material-deps'
    sed -i "/prepublishOnly/d" package.json
    npm publish
    popd
  fi
  if [ $containsMatRenderer -eq 0 ] ; then
    pushd 'dist/libs/renderers/material-renderer'
    sed -i "/prepublishOnly/d" package.json
    npm publish
    popd
  fi
fi

# Commit and push
if [[ "$commit" == "y" ]] ; then
  git add .
  git commit -m "version bump and publish"
  git push
fi
