module.exports = {
  name: 'renderers-ng-bootstrap-renderer',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/renderers/ng-bootstrap-renderer',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
