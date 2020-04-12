module.exports = {
  name: 'fly-my-rockets',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/fly-my-rockets',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
