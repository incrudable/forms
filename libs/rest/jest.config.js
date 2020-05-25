module.exports = {
  name: 'rest',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/rest',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
