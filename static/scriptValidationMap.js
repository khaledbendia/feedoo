var marker;
var center = [ -0.631281,35.705048];
function isMobileOrTablet(){var i,a=!1;return i=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(i)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(i.substr(0,4)))&&(a=!0),a}window.isMobileOrTablet=window.isMobileOrTablet||isMobileOrTablet;
function convertToPoint(t){return{point:{latitude:t.lat,longitude:t.lng}}}function convertToSpeedFormat(t,r){return t+(r||"km/h")}function formatToDurationTimeString(t){var r=moment.utc(1e3*t);return t>86400?r.format("d [day] h [h] m [m]"):t>3600?r.format("H [h] m [m] s [s]"):t>60?r.format("m [m] s [s]"):t>0?r.format("s [s]"):"No delay"}function formatToShortDurationTimeString(t){var r=moment.duration(t,"seconds");return t>3600?r.format("h [h] m [m]"):t>60?r.format("m [m]"):"No delay"}function formatToTimeString(t){return moment(t).format("HH:mm:ss")}function formatToDateString(t){return moment(t).format("DD/MM/YYYY")}function formatToShortenedTimeString(t){return moment(t).format("h:mm a")}function dateTimeStringToObject(t,r){if(!t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/))throw new TypeError("Wrong date format provided. It needs to follow dd/mm/yyyy pattern.");return moment(t+r,"DD/MM/YYYYh:mm A").toDate()}function dateStringToObject(t){return moment(t,"YYYY-MM-DD").toDate()}function formatToDateWithFullMonth(t){return moment(t).format("MMMM D, YYYY")}function formatToExpandedDateTimeString(t){return moment(t).format("dddd, MMM D, HH:mm:ss")}function formatToDateTimeString(t){return moment(t).format("MMM D, HH:mm:ss")}function formatToDateTimeStringForTrafficIncidents(t){return moment(t).format("YYYY-MM-DD HH:mm")}function formatAsImperialDistance(t){var r=Math.round(1.094*t);return r>=1760?Math.round(r/17.6)/100+" mi":r+" yd"}function formatAsMetricDistance(t){var r=Math.round(t);return r>=1e3?Math.round(r/100)/10+" km":r+" m"}function roundLatLng(t){return Math.round(1e6*t)/1e6}function formatCategoryName(t){var r=t.toLowerCase().replace(/_/g," ");return r.charAt(0).toUpperCase()+r.slice(1)}var Formatters={convertToPoint:convertToPoint,convertToSpeedFormat:convertToSpeedFormat,formatToDurationTimeString:formatToDurationTimeString,formatToShortDurationTimeString:formatToShortDurationTimeString,formatToTimeString:formatToTimeString,formatToExpandedDateTimeString:formatToExpandedDateTimeString,formatAsImperialDistance:formatAsImperialDistance,formatAsMetricDistance:formatAsMetricDistance,roundLatLng:roundLatLng,formatToDateString:formatToDateString,formatToShortenedTimeString:formatToShortenedTimeString,dateTimeStringToObject:dateTimeStringToObject,dateStringToObject:dateStringToObject,formatToDateWithFullMonth:formatToDateWithFullMonth,formatCategoryName:formatCategoryName,formatToDateTimeString:formatToDateTimeString,formatToDateTimeStringForTrafficIncidents:formatToDateTimeStringForTrafficIncidents};window.Formatters=window.Formatters||Formatters;
function mapContent()
{
    if(localStorage.getItem("LngLat") !== null)
    {
        center = JSON.parse(localStorage["LngLat"]);
        $("#plusDeSpecification").val(localStorage["plusDeSpecification"]);
    }
		var api_key = '7kvbZdgzwMCDRjDyFrD0ZNECa1yqiubx';
		var roundLatLng = Formatters.roundLatLng;
        var popup = new tt.Popup({
            offset: 35
        });
        var map = tt.map({
            key: api_key,
            container: 'map',
            dragPan: !isMobileOrTablet(),
            center: center,
            zoom: 15
        });
        map.addControl(new tt.GeolocateControl());

        marker = new tt.Marker({
            draggable: false
        }).setLngLat(center).addTo(map);

       
        function markerChangePos() {
            var lngLat = map.getCenter();
            lngLat = new tt.LngLat(roundLatLng(lngLat.lng), roundLatLng(lngLat.lat));
            marker.setLngLat(lngLat);
        }
        map.on('move',markerChangePos);
    }