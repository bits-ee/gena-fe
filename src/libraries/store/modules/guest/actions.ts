export default {
    GET_CURRENT_LOCATION(context: any){
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos : any) {
            const crd : any = pos.coords;
            console.log(`Широта: ${crd.latitude}`);
            console.log(`Долгота: ${crd.longitude}`);
            const coords: number[] = [crd.latitude, crd.longitude];
            context.commit("findLoc", coords)
        };

        function error(err : any) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    }
}