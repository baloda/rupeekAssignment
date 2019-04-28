const xmlParser = require('xml2json')
const GeoPoint = require('geopoint')
const moment = require('moment')
const fs = require('fs')

var xml = fs.readFileSync('./problem_1.gpx', 'utf8')

let fileJson = xmlParser.toJson(xml)
fileJson = JSON.parse(JSON.stringify(fileJson))
fs.writeFileSync('./problem_1.json', fileJson)
fileJson = JSON.parse(fs.readFileSync('./problem_1.json'))
trkpt = fileJson['gpx']['trk']['trkseg']['trkpt']

trkpt =trkpt.sort((a, b)=>{
    return Date.parse(a.time) - Date.parse(b.time)
})
// distance in meter
// moment('2016-12-11T00:52:09').diff(moment('2016-12-11T01:52:09'), 'minutes')
total_distance = 0
start_date_time = (trkpt[0].time || '').replace('Z','')
end_date_time = (trkpt[trkpt.length-1].time || '').replace('Z','')
trip_time_taken_in_seconds = moment(end_date_time).diff(moment(start_date_time), 'seconds')
max_speed = 0
min_ele = 10000000
max_ele = 0
trkpt.forEach((element,index) => {
    if (index == 0) return;
    lat = element.lat
    a = new GeoPoint(parseFloat(element.lat), parseFloat(element.lon));
    b = new GeoPoint(parseFloat(trkpt[index-1].lat), parseFloat(trkpt[index-1].lon))

    dist = a.distanceTo(b, true) * 1000
    total_distance += dist

    let last_point_time = (trkpt[index-1].time || '').replace('Z','')
    let curr_point_time = (trkpt[index].time || '').replace('Z','')
    let duration = moment(curr_point_time).diff(moment(last_point_time), 'seconds')

    if (dist/duration > max_speed) {
        max_speed = dist/duration
    }
    if (min_ele > element.ele) {
        min_ele = parseFloat(element.ele)
    }
    if (max_ele < element.ele) {
        max_ele = parseFloat(element.ele)
    }
});


console.log(`Trip Start Time:               ${start_date_time}`)
console.log(`Trip End Time:                 ${end_date_time}`)
console.log(`Trip Time Taken(seconds):      ${trip_time_taken_in_seconds}`)
console.log(`Total Distance(meters):        ${total_distance}`)
console.log(`Trip Avg Speed (meter/s):      ${total_distance/trip_time_taken_in_seconds}`)
console.log(`Trip Max Speed (meter/s):      ${max_speed}`)
console.log(`Trip Min Elevation:            ${min_ele}`)
console.log(`Trip Max Elevation:            ${max_ele}`)

// console.log(trkpt)