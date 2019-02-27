cd /home/vmuser/cs353
git pull
pkill -f "node app.js"
cd myapp
npm install
node app.js &
