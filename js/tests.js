// http://docs.phonegap.com/en/edge/cordova_inappbrowser_inappbrowser.md.html#InAppBrowser
// https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/
// https://www.formget.com/phonegap-inappbrowser/ 
$(document).ready(function(){

    function isJSON(str) {
        try {
            return (JSON.parse(str) && !!str);
        } catch (e) {
            return false;
        }
    }

    function openAuthBrowserTest(url){
        let browser_ref = cordova.InAppBrowser.open(url, '_blank', 'location=yes,hideurlbar=no');
        // let browser_ref = cordova.InAppBrowser.open('http://example.com', '_blank', 'EnableViewPortScale=yes');
        // browser_ref.addEventListener('loadstop', function(event) { alert(JSON.stringify(event)); });
        browser_ref.addEventListener('loadstop', function(event) {
            //  alert(JSON.stringify(event)); 

            let json_data = null

            try {
                json_data = JSON.parse(decodeURIComponent(new URL(event.url).search.substring(1).split("=")[1]))
            } catch (error) {
                
            }

            if(json_data){
                // alert(JSON.stringify(json_data))
                // return
                if(json_data.hasOwnProperty('txRef')){
                    alert('Close Broswer 1')
                }
            }
            

            // var scriptLoadStop = "document.querySelector('body').textContent;"
            var scriptLoadStop = `
            function isJSON(str) {
                try {
                    let isJson = (JSON.parse(str) && !!str);
                    return {
                        isJson: isJson,
                        data: JSON.parse(str)
                    }
                } catch (e) {
                    //return false;
                    return {
                        isJson: false,
                        data: {}
                    }
                }
            }
            let htmlStr = document.querySelector('body').textContent;
            isJSON(htmlStr);
            `

            browser_ref.executeScript({ code: scriptLoadStop }, function(json_data_page){
                // alert(JSON.stringify(params))
                // alert(params)
                // alert(typeof params)
                // alert(JSON.stringify(json_data_page[0]['data']))
                if(json_data_page[0]['data'].hasOwnProperty('txRef')){
                    alert('Close Broswer 2')
                }
            });


        });

        browser_ref.addEventListener('exit', function() {
            //Clean Up | Mark as cancelled
        })
        browser_ref.addEventListener('message', function(params){
            // alert('message', params.data)
        });
        
        browser_ref.open
        // alert("Test")
        // browser_ref.addEventListener('loadstart', function(event) { alert(event.url); });
        
    }

    function messageCallBack(params){
        alert('message', params.data)
    }

    // http://docs.phonegap.com/en/edge/cordova_inappbrowser_inappbrowser.md.html#InAppBrowser

    $("#test-browser-btn").on('click', function(){
        // let url ='http://apache.org'
        let url ='https://a6221841.ngrok.io/tests/1.json?r={"message":"test", "txRef":"test"}'
        openAuthBrowserTest(url);

    })
})
