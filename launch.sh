#! /bin/bash

ip_raw=$(hostname -I | awk '{print $1}')
echo "Ip adress is: $ip_raw"

ip="'$ip_raw'"

echo "-----------"
echo "ip = $ip;" > ip.js

echo "Starting rosbridge on port 9090..."
echo "Starting web server on $ip_raw :8080 ..."
source /opt/ros/iron/local_setup.bash
ros2 launch rosbridge_server rosbridge_websocket_launch.xml & python3 -m http.server 8080 && fg
