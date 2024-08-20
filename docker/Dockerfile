# Sử dụng image node chính thức
FROM node:18

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json (nếu có)
COPY ../package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY ../. .

# Biên dịch TypeScript sang JavaScript
RUN npm run build

# Expose port ứng dụng
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["npm", "run", "start:prod"]
