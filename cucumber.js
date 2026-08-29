module.exports = {
  default: {
    require: [
      'features/support/**/*.js',
      'features/step-definitions/**/*.js'
    ],
    paths: ['features/**/*.feature'],
    format: ['progress'],
    publishQuiet: true
  }
};