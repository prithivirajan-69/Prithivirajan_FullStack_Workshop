#!/bin/bash
set -e   # Exit immediately if any command fails

# =========================
# Log Analyzer Script
# =========================

# Read command-line argument
LOG_FILE="$1"

# Check if argument is provided
if [ $# -eq 0 ]; then
    echo "Please provide log file"
    exit 1
fi

# Check if file exists
if [ ! -f "$LOG_FILE" ]; then
    echo "File not found!"
    exit 1
fi

# =========================
# Log Analysis
# =========================

# Total number of lines
TOTAL_LINES=$(wc -l < "$LOG_FILE")

# Count log levels
INFO_COUNT=$(grep -c "INFO" "$LOG_FILE")
WARNING_COUNT=$(grep -c "WARNING" "$LOG_FILE")
ERROR_COUNT=$(grep -c "ERROR" "$LOG_FILE")

# Extract unique IP addresses
IP_LIST=$(grep -oE '[0-9]{1,3}(\.[0-9]{1,3}){3}' "$LOG_FILE" | sort -u)

# =========================
# Report Output
# =========================

echo "========== LOG ANALYSIS REPORT =========="
echo "File: $LOG_FILE"
echo "Total Lines: $TOTAL_LINES"
echo "----------------------------------------"
echo "INFO:    $INFO_COUNT"
echo "WARNING: $WARNING_COUNT"
echo "ERROR:   $ERROR_COUNT"
echo "----------------------------------------"

# Print IP addresses if found
if [ -z "$IP_LIST" ]; then
    echo "No IP addresses found"
else
    echo "Unique IP Addresses Found:"
    for ip in $IP_LIST; do
        echo " - $ip"
    done
fi

echo "========================================"
