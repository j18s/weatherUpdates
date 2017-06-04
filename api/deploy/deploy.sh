ssh sumitjolly@myweatherforecast.southindia.cloudapp.azure.com
cd WeatherForecast/
git pull
sudo pkill -f node
sudo npm start > stdout.txt 2> stderr.txt &
