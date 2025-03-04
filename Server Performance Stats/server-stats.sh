#!/bin/bash

echo "-------------Server Performance Stats------------------"
echo ""
echo ""

# Ask user for the number of top proceses to display
read -p "Number of top CPU-consuming processes to display? " CPU_COUNT
read -p "Number of top Memory-consuming processes to display? " MEM_COUNT


CPU_USAGE=$(mpstat 1 1 | awk '/Average:/ {print 100 - $NF"%"}')
echo "Total CPU Usage: $CPU_USAGE"

#Get Memory Usage(RAM Usage)
MEMORY=$(free -m | awk 'NR==2 {printf "Used: %sMB / Total: %sMB (%.2f%%)\n", $3, $2, $3*100/$2 }')
echo "Memory Usage: $MEMORY"


#Get Disk Usage
DISK_USAGE=$(df -h / | awk 'NR==2 {printf "Used: %s / Total: %s (%s)\n", $3, $2, $5}')
echo "Disk Usage: $DISK_USAGE"
echo ""
echo ""
# Top 5 processes by CPU and Memory Usage
echo "Top $CPU_COUNT CPU-consuming processes:"
ps -eo pid,comm,%cpu --sort=-%cpu | head -n $((CPU_COUNT + 1))
echo ""
echo ""
echo "Top $MEM_COUNT Memory-consuming processes:"
ps -eo pid,comm,%mem --sort=-%mem | head -n $((MEM_COUNT + 1))

echo ""
echo ""
echo ""
# Extra Stats 
echo "System Info: "

echo "OS Version: $(lsb_release -d | cut -f2-)"
echo "Uptime: $(uptime -p)"
echo "Load Average: $(uptime | awk -F 'load average:' '{ print $2 }')"
echo "Logged-in Users: $(who | wc -l)"

