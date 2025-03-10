#!/bin/bash



echo "Starting system load test for Netdata monitoring..."

# Simulate CPU load (4 cores for 60 seconds)
echo "Generating CPU load..."
stress-ng --cpu 4 --timeout 60s &

# Simulate RAM usage (Allocate 500MB for 60 seconds)
echo "Generating Memory load..."
stress-ng --vm 1 --vm-bytes 500M --timeout 60s &

# Simulate Disk I/O (Read & Write operations for 60 seconds)
echo "Generating Disk load..."
dd if=/dev/zero of=/tmp/diskload bs=1M count=500 oflag=direct &

# Simulate Network activity (Download a large file)
echo "Generating Network load..."
wget -q --show-progress http://speedtest.tele2.net/100MB.zip -O /dev/null &

echo "Load test started! Open Netdata dashboard to monitor system metrics."
echo "http://localhost:19999"

# Wait for all background processes to finish
wait

echo "Test completed! Check your Netdata dashboard."
