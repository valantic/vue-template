module.exports = {
  verbose: false,
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.vue$': 'vue-jest',
  },
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1'
  },
};
