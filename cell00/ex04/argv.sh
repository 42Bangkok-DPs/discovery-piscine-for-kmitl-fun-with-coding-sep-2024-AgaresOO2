if [ "$#" -eq 0 ]; then
	echo "no arg"
else
	for arg in "$@"; do
	count=$((count + 1))
	echo "$arg"
	if [ "$count" -ge 3 ]; then
		break
		fi
	done
fi
