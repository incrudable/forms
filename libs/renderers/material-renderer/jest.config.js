module.exports = {
  name: 'forms-renderers-material-renderer',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/renderers/material-renderer',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
