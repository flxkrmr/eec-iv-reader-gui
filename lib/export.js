function createCsvString(data) {
  var sortedBySecond = []
  var sortedBySecondFlat = []
  data
    .map(elem => {
      const d = new Date(elem['time']);
      d.setMilliseconds(0);
      var seconds = d.getSeconds()
      d.setSeconds(seconds - seconds%2)
      return {"time": d, "data": elem["data"]};
    })
    .forEach((elem) => {
      const time = elem["time"].getTime()
      const existing_data = sortedBySecond[time]
      sortedBySecond[time] = {...existing_data, ...elem['data']}
    })

  for (var timestamp in sortedBySecond) {
    const time = new Date(parseInt(timestamp));
    const timeReadable = ('00' + time.getHours()).slice(-2) + ":" + ('00' + time.getMinutes()).slice(-2) + ":" + ('00' + time.getSeconds()).slice(-2);
    sortedBySecondFlat.push({...{'time': timeReadable}, ...sortedBySecond[timestamp]})
  }

  var keys = new Set()

  var all = []

  sortedBySecondFlat.forEach(elem => {
    Object.keys(elem).forEach(key => keys.add(key))
  })

  keys = Array.from(keys)

  all.push(keys)

  sortedBySecondFlat.forEach(elem => {
    var line = keys.map(key => {
      return elem[key]
    })
    all.push(line)
  })

  let csv = "";

  all.forEach(line => {
    let lineCsv = line.join(",");
    csv += lineCsv + "\r\n";
  });

  return csv;
}
