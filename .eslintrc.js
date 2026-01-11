const path = require('path')

module.exports = {
  // ✅ Kế thừa các rule mặc định từ ESLint, React, TypeScript và Prettier
  extends: [
    'eslint:recommended', // Rule cơ bản của ESLint
    'plugin:react/recommended', // Rule gợi ý cho React
    'plugin:react-hooks/recommended',
    'plugin:import/recommended', // Rule kiểm tra import/export
    'plugin:jsx-a11y/recommended', // Rule hỗ trợ accessibility (JSX)
    'plugin:@typescript-eslint/recommended', // Rule cho TypeScript
    'eslint-config-prettier', // Tắt rule ESLint xung đột với Prettier
    'prettier' // Kích hoạt rule format từ Prettier
  ],

  // ✅ Khai báo plugin
  plugins: ['prettier'],

  // ✅ Cài đặt thêm cho ESLint
  settings: {
    react: {
      // Giúp eslint-plugin-react tự nhận phiên bản React
      version: 'detect'
    },
    // Cấu hình cách ESLint xử lý các import
    'import/resolver': {
      node: {
        // Cho phép import ngắn gọn từ thư mục src
        paths: [path.resolve(__dirname)],
        // Các phần mở rộng được ESLint nhận diện
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },

  // ✅ Định nghĩa các rule tùy chỉnh
  // rules: {
  //   // Tắt rule yêu cầu import React trong JSX (React 17+ không cần nữa)
  //   'react/react-in-jsx-scope': 'off',

  //   // Cảnh báo nếu dùng <a target="_blank"> mà không có rel="noreferrer"
  //   'react/jsx-no-target-blank': 'warn',
  //   // Tắt rule kiểm tra biến không dùng đến
  //   '@typescript-eslint/no-unused-vars': 'off',

  //   // Rule format của Prettier (copy từ file .prettierrc)
  //   'prettier/prettier': [
  //     'warn',
  //     {
  //       arrowParens: 'always', // Luôn có ngoặc khi dùng arrow function
  //       semi: false, // Không dùng dấu chấm phẩy
  //       trailingComma: 'none', // Không thêm dấu phẩy cuối cùng
  //       tabWidth: 2, // Sử dụng 2 khoảng trắng cho tab
  //       endOfLine: 'auto', // Tự động nhận kiểu xuống dòng (Windows/Linux)
  //       useTabs: false, // Không dùng tab, chỉ dùng space
  //       singleQuote: true, // Dùng dấu nháy đơn '
  //       printWidth: 120, // Giới hạn độ dài mỗi dòng là 120 ký tự
  //       jsxSingleQuote: true // Dùng nháy đơn trong JSX
  //     }
  //   ]
  // }
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-target-blank': 'warn',

    // ⚠️ Thêm dòng này để tắt cảnh báo biến chưa dùng
    '@typescript-eslint/no-unused-vars': 'off',

    '@typescript-eslint/no-explicit-any': 'warn',

    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  }
}
