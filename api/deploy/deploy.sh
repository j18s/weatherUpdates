ssh sumitjolly@myweatherforecast.southindia.cloudapp.azure.com
cd WeatherForecast/
git pull
sudo pkill -f node
sudo NODE_ENV=production npm start > stdout.txt 2> stderr.txt &
sudo serve -s -p build > stdout.txt 2> stderr.txt &