module.exports = {
  name: 'rest',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/rest',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
