module.exports = {
  extends: ['taro/react'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  globals: {
    "wx": true,
    "isNaN": true,
    "getCurrentPages": true,
    Page: true,
    Component: true
  },
};
