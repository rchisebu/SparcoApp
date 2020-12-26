// SERVER_URL = 'https://fff912d9.ngrok.io/sparco-api-v2'; //Dev
// SERVER_URL = 'http://192.168.0.102:5000'; //Dev
// SERVER_URL = 'https://sparco-api.herokuapp.com'; //Live DEPLETED//
SERVER_URL = 'https://sparco-api-v2.herokuapp.com'; //Live//
LOANS_SERVER_URL = 'https://sparco-loans-api.herokuapp.com'; //Live
// LOANS_SERVER_URL = 'https://sparco-api-test.000webhostapp.com/sparco-loans-api'; //Dev


var call_inner_check_transaction_status = iframetxcheck = pictureSource = destinationType = null;


$(document).ready(function(){

    M.AutoInit();

    $('.modal').modal({
        // dismissible: false,
        onCloseEnd: function(res){
            // alert('Modal Closed')
            let modal_name = $(res).data('modal-name')

            if (modal_name == 'tv-top-up-modal') {
                $('#tv-amount-due-input').css({'display':'none'})
                $('#tv-modal-select-funding-source').css({'display':'none'})
                $('#check-tv-balance-btn').attr('disabled',false)
                $('#smart-card-number-btn').css({'display':'none'})      
                $('#tv-loading-wrap').empty() 
                $('#check-tv-balance-btn').css({'display':'block'})     
            }

            if(modal_name == 'tx-status-modal'){
                alert('tx-status-modal')
            }

            clearInterval(call_inner_check_transaction_status);
            clearInterval(iframetxcheck);

        }
    });

    $('.datepicker').datepicker({
        'yearRange':50,
        'format': 'dd/mm/yyyy',
        'onSelect': function(date){
            // console.log(date)
            // $('#user-dob').text(moment(date).format('DD/MM/YYYY'))
            $('#complete-profile-dob').data('dob',date)
        },
    });
    $('select').formSelect();
    
    $('#loading-page').fadeOut()
    setTimeout(function () {
        $('#loading-page').fadeOut()
        isProfileComplete()

        // navigator.getAppVersion.getPackageName(function(){
        //     alert('test')
        // })



        // alert(JSON.stringify(cordova))
        

        // if (localStorage.getItem("sparco_account_active") == "yes") {
        if (localStorage.jwt) {
            $("#home-page").fadeIn();
            // if (!JSON.parse(localStorage.getItem("profile_is_complete"))) {
            if (!JSON.parse(localStorage.getItem("is_profile_complete"))) {
                // complete_profile();
            }
        } else {
            // $("#cover").hide();
            // $("#onboarding").show();

            // $("#login-page").fadeIn();
            $("#login-page").css({'display':'flex'});
        }
    }, 5000);

    // let top_up_modal = M.Modal.getInstance($('#top-up-modal'));
    // top_up_modal.open();
     
    // let tv_modal = M.Modal.getInstance($('#tv-modal'));
    // tv_modal.open();

    // let tv_topup_modal = M.Modal.getInstance($('#tv-top-up-modal'));
    // tv_topup_modal.open();

    // let electricity_modal = M.Modal.getInstance($('#electricity-modal'));
    // electricity_modal.open();

    // let funding_source_modal = M.Modal.getInstance($('#funding-source-modal'));
    // funding_source_modal.open();

    // let data_bundles_modal = M.Modal.getInstance($('#data-bundles-modal'));
    // data_bundles_modal.open();

    // let pm_type_modal = M.Modal.getInstance($('#pm-type-modal'));
    // pm_type_modal.open();

    // let card_details_modal = M.Modal.getInstance($('#add-card-page'));
    // card_details_modal.open();  

    // let card_details_modal = M.Modal.getInstance($('#add-mtn-money-modal'));
    // card_details_modal.open();  

    // let tx_status_modal = M.Modal.getInstance($('#tx-status-modal'));
    // tx_status_modal.open();  

    // let tx_modal = M.Modal.getInstance($('#tx-modal'));
    // tx_modal.open();  

    // let loan_v2_modal = M.Modal.getInstance($('#loan-v2-modal'));
    // loan_v2_modal.open();  

    // let confirm_transfer_modal = M.Modal.getInstance($('#confirm-transfer-modal'));
    // confirm_transfer_modal.open();  

    // $('#payment-status-msg').html(`
    // <h6 class="center" style="font-weight: bold;
    // ">Error Processing Payment</h6>
    //     <p id="err-modal-msg" style="text-align: center; color: red">SOME ERROR</p>

    //     <span style="text-align: center; display: block;">Contact Us For Support:</span>
    //     <button class="btn-small btn-flat support-contact-btn" data-link="tel:+260975687373" style="text-align: center; display: block; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">local_phone</i>+260975687373</button>
    //     <button class="btn-small btn-flat support-contact-btn" data-link="mailto:support@broadpay.co.zm" style="text-align: center;  display: block; text-transform: lowercase; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">mail</i>support@broadpay.co.zm</button>
    // `)




    // let addr_auth_page = M.Modal.getInstance($('#addr-auth-page'));
    // addr_auth_page.open();  

    // let data_modal = M.Modal.getInstance($('#data-modal'));
    // data_modal.open();  

    // let coming_soon_modal = M.Modal.getInstance($('#coming-soon-modal'));
    // coming_soon_modal.open();  

    // let support_modal = M.Modal.getInstance($('#support-modal'));
    // support_modal.open(); 

    // let error_modal = M.Modal.getInstance($('#error-modal'));
    // error_modal.open();  

});

function isProfileComplete(){
    if(localStorage.jwt){
        $.get(`${SERVER_URL}/is-profile-complete.php`, {token: localStorage.jwt},(res)=>{
            if(!res['isProfileComplete']){
                // alert('Profile is not complete')
                $('#complete-profile-page').css({'display':'block'})
                $('#checking-profile-details-loader').css({display: 'none'})
            }
        })
    }

}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    options = {

    }
    var instances = M.Sidenav.init(elems, options);
});

function topUpContact(displayName,phoneNumber) {

    let modalHtml = null
    let topUpNetwork = null
    if (phoneNumber.startsWith("096") || phoneNumber.startsWith("076")) {
        topUpNetwork = 'mtn'
    }
    if (phoneNumber.startsWith("097")) {
        topUpNetwork = 'airtel'
    }
    if (phoneNumber.startsWith("095")) {
        topUpNetwork = 'zamtel'
    }

    if (topUpNetwork) {
        modalHtml = `
            <h6>Contact Name: <b id="final-top-up-name">${displayName}</b></h6>
            <h6>Phone Number: <b id="final-top-up-num">${phoneNumber}</b></h6>
            <h6>Operator: <b>${topUpNetwork.toUpperCase()}</b></h6>
            <input id="final-top-up-amount-input" type="number" placeholder="Enter Amount">
            <input id="final-top-up-network-input" type="hidden" value="${topUpNetwork}">
            <input id="final-top-up-pm-input" type="hidden" >
            <input id="final-top-up-num-input" type="hidden" value="${phoneNumber}">
            <div id="final-top-up-pm" class="col s12 select-funding-source" style="border-bottom: 1px solid #9e9e9e; margin-bottom: 10px; padding: 10px;">
                <span style="color: #9e9e9e;">
                    Select Funding Source
                </span>
                <i class="material-icons right">arrow_drop_down</i>
            </div>
                    
            <button class="btn sparco-blue sparco-center-btn topup-checkout-btn">
                Checkout
                <i class="material-icons right">arrow_forward</i>
            </button>
        `
    }else{
        modalHtml = `
            <h6 style="text-align: center;">Network not supported.</h6>
        `      
    }

    $('#top-up-modal > .modal-content').html(modalHtml)
    let top_up_modal = M.Modal.getInstance($('#top-up-modal'));
    top_up_modal.open();
    // alert(`top up: ${displayName}`)
}

function onSuccessContacts(contacts) {

    for (var i=0; i<contacts.length; i++) {
        try {
            displayName = contacts[i].displayName
            phoneNumber =contacts[i].phoneNumbers[0].value.replace(/\s+/g, '').replace(/\-/g, '').replace('+260', '0')
            $('#contacts_list').append(`
                <li class="collection-item avatar" onclick="topUpContact('${displayName}','${phoneNumber}');">
                    <i class="material-icons circle">perm_identity</i>
                    <span class="title">${displayName}</span>
                    <p>${phoneNumber}</p>
                </li>   
                `)
        }
        catch (e) {
            // console.log(e)
        }
    }

}

function onErrorContacts(contactError) {
    // alert('onError!');
}


function getContacts() {
    // find all contacts with 'Bob' in any name field
    var options = new ContactFindOptions();
    // options.filter="";
    options.filter   = "";
    options.multiple = true;
    var fields = ["displayName", "name"];
    navigator.contacts.find(fields, onSuccessContacts, onErrorContacts, options);

}

document.addEventListener("deviceready", onDeviceReady, false);
// document.addEventListener("deviceready", onDeviceReady, true);

function onDeviceReady() {

    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;

    // window.cache.clear( function(){

    // }, function(error){
        
    // } );

    cordova.getAppVersion.getVersionNumber(function (version) {
        // alert(`Sparco\n\n\n\n\nApp Version Number ${version}`)
        $('#app-version').text(`Sparco App Version: ${version}`)
    });



    // START - ONESIGNAL

    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    
    var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window.plugins.OneSignal
        .startInit("7474bb6d-0a9c-4e3f-b55d-0834043ce2b6")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
    

    // END - ONESIGNAL


}

function get_number(force_new_pw=false) {

    var number = iti.getNumber();

    $('.pin-code-wrap > input').val('')

    // console.log(number)
    // console.log(iti.isValidNumber())

    
    $('#checking-num-loader').css({'display': 'inline'})
    $('#phone').prop('disabled', true)
    $('#check-num-btn').prop('disabled', true)


    if (iti.isValidNumber()) {

        $.get(SERVER_URL + "/account.php", {
            task: 'get_account',
            phone: number
        }).done(function (res) {
            // console.log(res);

            // $('#check-sms-code-btn').prop('disabled', true)

            localStorage.setItem("sparco_account_activation_code", res['pass_code']);
            localStorage.setItem("account_first_name", res['first_name'])
            localStorage.setItem("account_last_name", res['last_name']);
            localStorage.setItem("account_email", res['email']);
            localStorage.setItem("sparco_account_number", number);
            localStorage.setItem("jwt", res['token']);

            if (force_new_pw) {
                // localStorage.setItem("profile_is_complete", true);
                localStorage.setItem("set_new_pass_code", true);

                // var code_entry_view = $("#code_entry_view").html();

                // $("#onboarding").show();
                // $("#onboarding").html(code_entry_view);   
                
				$('#login-code-info').text('Create Your Own Pass Code');
				$('#code-input-page').fadeIn();
				$('.pin-code-wrap > input').val('')
				$('#login-page').css({'display': 'none'});

            }

            if (res['error'] == 'number_not_found') {
                $.get(SERVER_URL + "/send_sms.php", {
                    phone: number
                }, function(activation_code) {

                    localStorage.setItem("sparco_account_number", number);

                    localStorage.setItem("sparco_account_activation_code", activation_code);
                    localStorage.setItem("profile_is_complete", false);
                    localStorage.setItem("set_new_pass_code", true);

                    // var code_entry_view = $("#code_entry_view").html();

                    // $("#onboarding").show();
                    // $("#onboarding").html(code_entry_view); 
					$('#code-input-page').fadeIn();
					$('#login-page').css({'display': 'none'});

                })
            } else {
               
                localStorage.setItem("profile_is_complete", true);

                // var code_entry_view = $("#code_entry_view").html();

                // $("#onboarding").html(code_entry_view);
				$('#login-code-info').text('Please Enter Your Pass Code');
				$('#code-input-page').fadeIn();
				$('#login-page').css({'display': 'none'});

				$('.onboarding_action_area > span').css({'display': 'block'});
            }

        })
        .fail(function() {
            // alert( "error" );
            M.toast({html: 'Error logging in. Please try again later.'});
          })
        .always(function() {
            $('#checking-num-loader').css({'display': 'none'})
            $('#phone').prop('disabled', false)
            $('#check-num-btn').prop('disabled', false) 
        });

    } else {
        alert("Please enter a valid number!");
    }

}

// authenticate()
// authenticate(is_code_entry=true)
function authenticate(is_code_entry=false, is_new_code=false){
    let number = iti.getNumber();
    let passcode = newpasscode = "";
    let auth_data = {
        phone: number
    };
    // $('.pin-code-wrap > input').val('')

    $('#checking-num-loader').css({'display': 'inline'})
    $('#phone').prop('disabled', true)
    $('#check-num-btn').prop('disabled', true)

    if(is_code_entry || is_new_code){
        let sms_digit_1 = $("#sms_digit_1").val();
        let sms_digit_2 = $("#sms_digit_2").val();
        let sms_digit_3 = $("#sms_digit_3").val();
        let sms_digit_4 = $("#sms_digit_4").val();
    
        let sms_code = sms_digit_1 + sms_digit_2 + sms_digit_3 + sms_digit_4;
        
        // console.log('sms_code', sms_code);

        // if(!(sms_digit_1 || sms_digit_2 || sms_digit_3 || sms_digit_4)){
        if(sms_code.length != 4){
            M.toast({html: 'Please make sure your pass code has 4 digits.'});
            return;
        }

        // $('#checking-code-loader').css({display: 'block'});
        $('#checking-code-loader').fadeIn();
        

        if(is_code_entry){
            passcode = sms_code;
            localStorage.setItem('passcode', sms_code);
            auth_data['passcode'] = passcode;
            $('#check-sms-code-btn').prop('disabled',true);
            
        }else if(is_new_code){
            newpasscode = sms_code;
            // localStorage.setItem('newpasscode', sms_code);
            auth_data['passcode'] =  localStorage.getItem('passcode');
            auth_data['newpasscode'] = sms_code;
            $('#check-sms-code-btn').prop('disabled',true);

        }else{
            // 
        }
        
    }
    
    if (iti.isValidNumber()) {

        $.post(SERVER_URL + "/authenticate.php", auth_data).done(function (res) {
            console.log(res);
            $('#checking-code-loader').fadeOut();

            // res['action'] = 'enter_new_code'

            // console.log(res);

            if(!res.is_error && (res['action'] == 'enter_code')){
                
                $('.pin-code-wrap > input').val('');
				// $('#login-code-info').text('Please Enter Your Pass Code');
				$('#login-code-info').text(res['message']);
				$('#code-input-page').fadeIn();
				$('#login-page').css({'display': 'none'});

                $('.onboarding_action_area > span').css({'display': 'block'});
                
            }

            if(!res.is_error && (res['action'] == 'enter_new_code')){

                $('.pin-code-wrap > input').val('');
				// $('#login-code-info').text('Please Enter Your Pass Code');
				$('#login-code-info').text(res['message']);
				$('#code-input-page').fadeIn();
				$('#login-page').css({'display': 'none'});
				$('#check-sms-code-btn').css({'display': 'none'});
				$('#create-new-code-btn').css({'display': 'block'});

				$('.onboarding_action_area > span').css({'display': 'block'});
            }

            if(res.is_error){
                M.toast({html: `Error: ${res.message}`});
                $('#checking-code-loader').css({display: 'none'});
                $('#check-sms-code-btn').prop('disabled',false)
                return;
                
            }

            if(!res.is_error && (res.action == 'sign_in') && res.token){
                localStorage.clear();
                localStorage.setItem("jwt", res['token']);
                if(!res.is_profile_complete){
                    // alert('Profile Not Complete')
                    localStorage.setItem("is_profile_complete", res.is_profile_complete);

                    if(res.is_profile_complete){
                        $('#code-input-page').fadeOut();
                        // $("#home-page").fadeIn(); 
                        $("#home-page").css({display: 'block'}); 
                    }else{
                        complete_profile();
                    }
                    
                }else{

                }
                $("#home-page").fadeIn(); 
                $('#code-input-page').fadeOut();
            }
        })
        .fail(function(err) {
            // alert( "error" );
            // console.log(err.message);
            M.toast({html: 'Error logging in. Please try again later.'});
          })
        .always(function() {
            $('#checking-num-loader').css({'display': 'none'})
            $('#phone').prop('disabled', false)
            $('#check-num-btn').prop('disabled', false) 
            $('#check-sms-code-btn').prop('disabled',false)
            $('#checking-code-loader').fadeOut();
        });

    } else {
        // alert("Please enter a valid number!");
        M.toast({html: 'Please enter a valid number!'});
        $('#checking-num-loader').css({'display': 'none'})
        $('#phone').prop('disabled', false)
        $('#check-num-btn').prop('disabled', false) 
    }

}

$(document).on('click', '#complete-profile-btn', function(){
    
})

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function complete_profile(){
	$('.pin-code-wrap > input').val('')
	// $('#check-sms-code-btn').prop('disabled', true)
	// $('#complete-profile-page').css({'display':'block'})


	$('#check-sms-code-btn').css({'display':'block'})
	$('#create-new-code-btn').css({'display':'none'})

}

function set_new_code() {
    var sms_digit_1 = $("#sms_digit_1").val();
    var sms_digit_2 = $("#sms_digit_2").val();
    var sms_digit_3 = $("#sms_digit_3").val();
    var sms_digit_4 = $("#sms_digit_4").val();

    var new_code = sms_digit_1 + sms_digit_2 + sms_digit_3 + sms_digit_4;



    // complete_profile();
    localStorage.setItem("sparco_account_activation_code", new_code);

    if (!JSON.parse(localStorage.getItem("profile_is_complete"))) {
        localStorage.setItem("set_new_pass_code", false);
        // complete_profile();
        complete_profile();
    }        
    if (JSON.parse(localStorage.getItem("set_new_pass_code"))) {
        localStorage.setItem("set_new_pass_code", false);
        $.post(`${SERVER_URL}/set-new-passcode.php?token=${localStorage.getItem("jwt")}`,{
            'new_pass_code': new_code,
        }, function(res){
            console.log(res);


			if (!res['is_error']) {
				$('#code-input-page').css({'display':'none'})
				$('#check-sms-code-btn').css({'display': 'block'})
				$('#create-new-code-btn').css({'display': 'none'})

				$("#home-page").fadeIn();	
			}


        })

    }
    $('#create-new-code-btn').prop('disabled', false)
    $('#create-new-code-btn').css({'display':'block'})

}

$(document).on('click', '#create-new-code-btn', function(){
	// $('#create-new-code-btn').css({'display':'none'})
	$('#create-new-code-btn').prop('disabled', true)
	// set_new_code()
})

function check_sms_code() {
    let sms_digit_1 = $("#sms_digit_1").val();
    let sms_digit_2 = $("#sms_digit_2").val();
    let sms_digit_3 = $("#sms_digit_3").val();
    let sms_digit_4 = $("#sms_digit_4").val();

    let sms_code = sms_digit_1 + sms_digit_2 + sms_digit_3 + sms_digit_4;

    if (sms_code == localStorage.getItem("sparco_account_activation_code")) {

    	$('.pin-code-wrap > input').val('')

    	// $('#create-new-code-btn').prop('disabled', false)

        localStorage.setItem("sparco_account_active", "yes");
        if(JSON.parse(localStorage.getItem("set_new_pass_code"))){

			$('#check-sms-code-btn').css({'display':'none'})
			$('#create-new-code-btn').css({'display':'block'})

			$('#login-code-info').text('Create Your Own Pass Code');
			$('#login-page').css({'display': 'none'});
			$('#code-input-page').fadeIn();
			
        }else{
            if (!JSON.parse(localStorage.getItem("profile_is_complete"))) {
                complete_profile();
            }       
            // $("#onboarding").hide();    
			$('#code-input-page').fadeOut();
			// $('#home-page').css({'display': 'block'});
			$("#home-page").fadeIn(); 
        }
        // $("#onboarding").hide();
    }else{

        $('#passcode-msg').delay(3000).fadeIn().delay(3000).fadeOut();

    }

    $('#check-sms-code-btn').prop('disabled',false)

}

$(document).on('click', '#check-sms-code-btn', function(){
	// console.log('check_sms_code')
	// $('#check-sms-code-btn').prop('disabled',true)

    /*
    setTimeout(function () {
    	check_sms_code()
    }, 3000);
    */
	
})

function get_saved_pms() {
    $.get(`${SERVER_URL}/get-saved-cards.php?token=${localStorage.getItem("jwt")}`, function(payment_methods) {
        let service_type = localStorage.getItem('service_type');
        let saved_pms = '';
        payment_methods.forEach((payment_method)=>{

                let payment_method_id = payment_method['id'];
                let payment_method_logo, payment_method_name, payment_method_number = '';

                if (payment_method['payment_method'] == 'card') {
                    payment_method_logo = `${payment_method['card_type'].toLowerCase()}_logo.png`;
                    payment_method_number = `&#8226;&#8226;&#8226;&#8226;${payment_method['ldigits']}`;
                    payment_method_name = `${payment_method['card_type'].toLowerCase()}`; 
                }
                if (payment_method['payment_method'] == 'mtn_money') {
                    payment_methd_logo = `${payment_method['payment_method']}_logo.png`;
                    payment_method_number = `${payment_method['phone']}`;
                    payment_method_name = `${payment_method['payment_method'].replace('_', ' ').toLowerCase()}`; 
                }
                saved_pms += `
                <li data-payment-method-id="${payment_method_id}" class="collection-item payment-method">
                	${payment_method_name} ${payment_method_number}
                </li>
                `    
            }
        )

        $('#saved-pm-list').html(saved_pms);
    })
}

function resetpasscode(){
    // let phone_number = localStorage.getItem("sparco_account_number")
    

    let phone_number = iti.getNumber();
    if (!iti.isValidNumber()) {
        M.toast({html: 'Please enter a valid phone number!'});
        return;
    }

    $('#checking-code-loader').fadeIn();

    let confirm_reset = confirm(`Please confirm passcode reset for ${phone_number}`)

    if (confirm_reset) {
        $.getJSON(`${SERVER_URL}/reset-passcode.php`,{'phone': phone_number}, function(res){
            console.log(res)
            // localStorage.setItem("sparco_account_activation_code", res['pass_code'])

            $('#login-code-info').text('Please Enter The Code Sent To Your Phone')
            $('.pin-code-wrap > input').val('')
            alert('New passcode sent to your phone.')
            // get_number(force_new_pw=true);
        })
        .fail(()=>{
            M.toast({html: 'Error reseting passcode. Please try again later.'});
        })
        .always(()=>{
            $('#checking-code-loader').fadeOut();
        })
    }
}

$(document).on('click', '#reset-passcode-btn', function(){
	resetpasscode()
})

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

check_transaction_status = (txref=null, error=false, error_type='', res_msg='')=>{
    // let txref = JSON.parse(localStorage.purchase_data)['txref'];

    localStorage.setItem('txid',txref);

    clearInterval(call_inner_check_transaction_status); //prevent multiple calls
    call_inner_check_transaction_status = setInterval(inner_check_transaction_status, 3000);


    if(error){
        clearInterval(call_inner_check_transaction_status);
        console.log('tx check cancelled. error')
        $('.circle-loader').addClass('load-complete'); 
        $("#inner-loader").addClass('status-cross');
        $('.load-complete').css({'border-color': '#de1c1c'});  
        $('#payment-status').text('Payment Failed');
        $('#order-status').text('Top Up Failed');


        $('#payment-status-msg').html(`
        <h6 class="center" style="font-weight: bold;
        ">Error Processing Payment</h6>
            <!-- 
            <p id="err-modal-msg" style="text-align: center; color: red"> Error Processing Payment. Please contact support.</p>
            -->
            <p id="err-modal-msg" style="text-align: center; color: red">${res_msg}</p>

            <span style="text-align: center; display: block;">Contact Us For Support:</span>
            <button class="btn-small btn-flat support-contact-btn" data-link="tel:+260975687373" style="text-align: center; display: block; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">local_phone</i>+260975687373</button>
            <button class="btn-small btn-flat support-contact-btn" data-link="mailto:support@broadpay.co.zm" style="text-align: center;  display: block; text-transform: lowercase; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">mail</i>support@broadpay.co.zm</button>
        `)

        return;
    }

    if (error && (error_type == "INSUFFICIENT_ACCOUNT_BALANCE") && !txref) {
        clearInterval(call_inner_check_transaction_status);
        console.log('tx check cancelled')
        $('.circle-loader').addClass('load-complete'); 
        $("#inner-loader").addClass('status-cross');
        $('.load-complete').css({'border-color': '#de1c1c'});  
        $('#payment-status').text('Payment Failed');
        $('#order-status').text('Top Up Failed');
        
        // $('#payment-status-msg').html(`
        //     <p style="color: red; text-align: center; margin: 0;">
        //         Unable to reach payment processor at the moment.
        //     </p>
        //     <p style="color: red; text-align: center; margin: 0;">
        //         Please try again later.
        //     </p>
        //     `)
        // $('#payment-status-msg').html(`
        //     <p style="color: red; text-align: center; margin: 0;">
        //         Failed Due To Insuffient Funds.
        //     </p>
        //     `)

        $('#payment-status-msg').html(`
        <h6 class="center" style="font-weight: bold;
        ">Error Processing Payment</h6>
            <p id="err-modal-msg" style="text-align: center; color: red"> Failed Due To Insuffient Funds.</p>

            <span style="text-align: center; display: block;">Contact Us For Support:</span>
            <button class="btn-small btn-flat support-contact-btn" data-link="tel:+260975687373" style="text-align: center; display: block; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">local_phone</i>+260975687373</button>
            <button class="btn-small btn-flat support-contact-btn" data-link="mailto:support@broadpay.co.zm" style="text-align: center;  display: block; text-transform: lowercase; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">mail</i>support@broadpay.co.zm</button>
        `)
    }


    function inner_check_transaction_status(){ 
        let date = new Date();
        let timestamp = date.getTime();
        // console.log(`${timestamp}`);
        // let txref = JSON.parse(localStorage.purchase_data)['txref'];

        txref = localStorage.getItem('txid');
        txref = txref.replace("sparcozm-","")
        $.get(`${SERVER_URL}/transaction-status.php?token=${localStorage.jwt}&txref=${txref}`, function(res){
            console.log('\n\ntransaction-status: ')
            console.log(JSON.stringify(res))
            // {payment_status: "PROCESSED", order_status: "FAILED", is_error: false}
            if (res['paymentstatus'] == 'PROCESSING') {
                $('#payment-status').text('Processing Payment')
                // $.get(`${SERVER_URL}/verify-payment.php?txref=${txref}`,function(res){
                //     console.log('Verify Payment')
                //     console.log(res);
                // })
            }
            if (res['paymentstatus'] == 'PROCESSED') {
                $('#payment-status').text('Payment Processed')
            }
            if (res['paymentstatus'] == 'FAILED') {
                $('#payment-status').text('Payment Failed')
            }

            if (res['orderstatus'] == 'PROCESSING') {
                $('#order-status').text('Processing Top Up')
            }
            if (res['orderstatus'] == 'PROCESSED') {
                $('#order-status').text('Top Up Processed')
            }
            if (res['orderstatus'] == 'FAILED') {
                $('#order-status').text('Top Up Failed')
            }
            if ((res['paymentstatus'] == 'PROCESSED') && (res['orderstatus'] == 'PROCESSED')) {
                clearInterval(call_inner_check_transaction_status);
                console.log('tx check cancelled')
                $('.circle-loader').addClass('load-complete');
                // $('.checkmark').toggle(); //Success                          
                $("#inner-loader").addClass('checkmark')

                // $('.load-complete').css({'border-color': '#de1c1c'})
                if (res['service'] == 'zesco') {
                    $('#payment-status-msg').html(`
                        <h6>Zesco Token</h6>
                        <p>${res['topupcode']}</p>
                        `)
                }
            }
            if (
                ((res['paymentstatus'] == 'PROCESSED') && (res['orderstatus'] == 'FAILED')) || 
                ((res['paymentstatus'] == 'FAILED') && (res['orderstatus'] == 'PROCESSED')) ||
                ((res['paymentstatus'] == 'FAILED') && (res['orderstatus'] == 'FAILED')) 
                ) {
                    let resrave = res.resrave;
                    let err_msg = ""
                    if (resrave){
                        try {
                            let resrave_json = JSON.parse(resrave)
                            try {
                                err_msg = resrave_json.data.vbvmessage
                                // $('#err-modal-msg').text(resrave_json.data.vbvmessage)
                                if(!err_msg){
                                    throw "No vbvmessage"
                                }
                            } catch (error) {
                                err_msg = resrave_json.message
                                // $('#err-modal-msg').text(resrave_json.message)
                            }         
                        } catch (error) {
                            
                        }
                        // $('#err-modal-msg').text(err_msg)
                        


                        // let error_modal = M.Modal.getInstance($('#error-modal'));
                        // error_modal.open(); 

                        $('#payment-status-msg').html(`
                        <h6 class="center" style="font-weight: bold;
                        ">Error Processing Payment</h6>
                            <p id="err-modal-msg" style="text-align: center; color: red">${err_msg}</p>
                
                            <span style="text-align: center; display: block;">Contact Us For Support:</span>
                            <button class="btn-small btn-flat support-contact-btn" data-link="tel:+260975687373" style="text-align: center; display: block; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">local_phone</i>+260975687373</button>
                            <button class="btn-small btn-flat support-contact-btn" data-link="mailto:support@broadpay.co.zm" style="text-align: center;  display: block; text-transform: lowercase; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">mail</i>support@broadpay.co.zm</button>
                        `)


                    }
                clearInterval(call_inner_check_transaction_status);
            	console.log('tx check cancelled final')
                $('.circle-loader').addClass('load-complete');
                // $('.status-cross').toggle(); //Fail      
                $("#inner-loader").addClass('status-cross')

                $('.load-complete').css({'border-color': '#de1c1c'})            
            }
        })
    }
  
}

function reg_err(topupid, err_msg) {
		let err_data = {
			'topupid': topupid,
			'err': JSON.stringify(err_msg),
        }
        $.ajax({
                type: 'post',
                // url: `https://0d44314c.ngrok.io/tests/topup.php?pm=card`,
                url: `${SERVER_URL}/reg-err.php?token=${localStorage.getItem('jwt')}`,
                data: err_data,
                success: function (res) {
                    console.log(res)

                }
            })
}

function pay_with_saved_pm() {
    let top_up_modal = M.Modal.getInstance($('#top-up-modal'));
    top_up_modal.close();

    // let payment_method_id = $(this).data('payment-method-id');

    // let {service: service, meter_number: topupnumber, amount: topupamount, first_name: fname, last_name: lname} = JSON.parse(localStorage.getItem('purchase_data'));

    let {pmid, topupnumber, service, topupamount, vouchertype} = JSON.parse(localStorage.getItem('top_up_data'))

    let data = {
        "service": service,
        "topupnumber": topupnumber,
        "topupamount": topupamount,    
        "vouchertype": vouchertype,    
    }

    $('#tx-status-modal > .modal-content').html(`
            <div id="status-info-wrap">
                <div id="inner-status-info-wrap">
                    <div class="circle-loader">
                      <!-- <div class="checkmark draw"></div> -->
                      <!-- <div class="status-cross"></div> -->
                      <div id="inner-loader" class="draw"></div>
                    </div>
                    <h5 id="payment-status">Processing Payment</h5>
                    <h5 id="order-status">Processing Order</h5>
                    <div id='payment-status-msg'>

                    </div>
                    <!--
                    <div id="order-pin">
                        <h6>Zesco Token</h6>
                        <p>0987654321</p>
                    </div>
                    -->
                    <!-- <p><button id="dismiss-success-fail-page-btn" type="button" class="btn btn-success">Dismiss</button></p> -->
                </div>
            </div>
    	`)
    let tx_status_modal = M.Modal.getInstance($('#tx-status-modal'));
    tx_status_modal.open();    

    $.ajax({
            type: 'post',
            url: `${SERVER_URL}/topup.php?pm=spm&pmid=${pmid}&token=${localStorage.getItem('jwt')}`,
            data: data,
            success: function (res) {
                console.log(res)

                if (res['data']['is_error'] && res['message']) {
                    check_transaction_status(txref=res['topupid'],error=res['data']['is_error'], error_type=res['message']);
                    reg_err(res['topupid'], res)
                }else{
                    check_transaction_status(txref=res['topupid']);
                }
            }
        })
}

function openAuthBrowser(url){
    let browser_ref = cordova.InAppBrowser.open(url, '_blank', 'location=yes,hideurlbar=no');
    browser_ref.addEventListener('loadstop', function(event) {
        console.log(JSON.stringify(event))
        let json_data = null

        try {
            json_data = JSON.parse(decodeURIComponent(new URL(event.url).search.substring(1).split("=")[1]))
        } catch (error) {  }
        if(json_data){
            if(json_data.hasOwnProperty('txRef')){
                // alert('Close Broswer 1')

                let txRef = json_data['txRef']

                let tx_status_modal = M.Modal.getInstance($('#tx-status-modal'));
                tx_status_modal.open(); 

                let res_msg = json_data['vbvrespmessage']
            
                if(localStorage.service_type == 'bill_payment'){
                    if(json_data['status'] == 'failed'){
                        
                        check_transaction_status(txref=txRef, error=true, error_type='', res_msg);
                    }else{
                        check_transaction_status(txref=txRef, error=false, error_type='');
                    }
                }
                if(localStorage.service_type == 'money_transfer'){
                    if(json_data['status'] == 'failed'){
                        check_transfer_status(txref=txRef, error=true, error_type='', res_msg);
                    }else{
                        check_transfer_status(txref=txRef, error=false, error_type='');
                    }
                }

                browser_ref.close()

            }
        }

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
        browser_ref.executeScript({ code: scriptLoadStop }, function(params){
            // console.log(JSON.stringify(params))
            let json_data_page = params[0]['data']
            if(json_data_page.hasOwnProperty('txRef')){
                // alert('Close Broswer 2')

                let txRef = json_data_page['txRef']

                let res_msg = json_data_page['vbvrespmessage']

                let tx_status_modal = M.Modal.getInstance($('#tx-status-modal'));
                tx_status_modal.open(); 
            
                if(localStorage.service_type == 'bill_payment'){
                    if(json_data_page['status'] == 'failed'){
                        check_transaction_status(txref=txRef, error=true, error_type='', res_msg);
                    }else{
                        check_transaction_status(txref=txRef, error=false, error_type='');
                    }
                }
                if(localStorage.service_type == 'money_transfer'){
                    if(json_data['status'] == 'failed'){
                        check_transfer_status(txref=txRef, error=true, error_type='', res_msg);
                    }else{
                        check_transfer_status(txref=txRef, error=false, error_type='');
                    }
                }

                browser_ref.close()
            }
        });
    });

    browser_ref.addEventListener('exit', function() {
        //Clean Up | Mark as cancelled
    })
    browser_ref.addEventListener('message', function(params){
        console.log('message')
        console.log(JSON.log(params))
    });
    
    browser_ref.open    
}

// pay_req
function pay_with_unsaved_pm(save_payment_method, is_addr_auth=false){

    let top_up_modal = M.Modal.getInstance($('#top-up-modal'));
    top_up_modal.close();

    $('#tx-status-modal > .modal-content').html(`
            <div id="status-info-wrap">
                <div id="inner-status-info-wrap">
                    <div class="circle-loader">
                      <!-- <div class="checkmark draw"></div> -->
                      <!-- <div class="status-cross"></div> -->
                      <div id="inner-loader" class="draw"></div>
                    </div>
                    <h5 id="payment-status">Processing Payment</h5>
                    <h5 id="order-status">Processing Order</h5>
                    <div id='payment-status-msg'>

                    </div>
                    <!--
                    <div id="order-pin">
                        <h6>Zesco Token</h6>
                        <p>131313135667788</p>
                    </div>
                    -->
                    <!-- <p><button id="dismiss-success-fail-page-btn" type="button" class="btn btn-success">Dismiss</button></p> -->
                </div>
            </div>
    `)

    let tx_status_modal = M.Modal.getInstance($('#tx-status-modal'));
    tx_status_modal.open(); 


    // let {service: service, meter_number: topupnumber, amount: topupamount, first_name: fname, last_name: lname} = JSON.parse(localStorage.getItem('purchase_data'));
    let {pmid, topupnumber, service, topupamount, vouchertype} = JSON.parse(localStorage.getItem('top_up_data'))
    let fname = localStorage.getItem("account_first_name");
    let lname = localStorage.getItem("account_last_name");

    let card_payment = (data)=>{

        $.ajax({
                type: 'post',
                url: `${SERVER_URL}/topup.php?pm=card&token=${localStorage.getItem('jwt')}`,
                data: data,
                success: function (res) {
                    console.log(JSON.stringify(res))

                    // $('#payment-methods-wrap').remove();
                    // check_transaction_status();
                    if (res['is_error'] && (res['message'] == "INSUFFICIENT_ACCOUNT_BALANCE")) {
                        // check_transaction_status(txref=res['topupid'], res['is_error'], res['message']);
                        
                        check_transaction_status(txref=res['topupid'],error=res['is_error'], error_type=res['message']);
                    }else{
                        // clearInterval(call_inner_check_transaction_status); //prevent multiple calls
                        check_transaction_status(txref=res['topupid'], error=false, error_type='');
                    }

                    let req = this;
                    if (res['status'] == 'error') {
                        console.log(res['message']);
                        // alert(res['message']);
                        $('#err-modal-msg').text(res['message'])

                        $('#payment-status-msg').html(`
                        <h6 class="center" style="font-weight: bold;
                        ">Error Processing Payment</h6>
                            <p id="err-modal-msg" style="text-align: center; color: red">${res['message']}</p>
                
                            <span style="text-align: center; display: block;">Contact Us For Support:</span>
                            <button class="btn-small btn-flat support-contact-btn" data-link="tel:+260975687373" style="text-align: center; display: block; padding: 0; margin: 0 auto;height: 20px;" ><i class="material-icons left">local_phone</i>+260975687373</button>
                            <button class="btn-small btn-flat support-contact-btn" data-link="mailto:support@broadpay.co.zm" style="text-align: center;  display: block; text-transform: lowercase; padding: 0; margin: 0 auto;height: 20px;" ><i class="material-icons left">mail</i>support@broadpay.co.zm</button>
                        `)

                        // TODO - Register Error Message in DB
                        reg_err(res['topupid'], res)

                    }

                    if (res['status'] == 'success' && (res['message'] == 'AUTH_SUGGESTION' || res['message'] == 'V-COMP')) {
                        if (res['data']['suggested_auth'] == 'PIN') {
                            let pin = prompt('Enter Pin: ');
                            data['auth_type'] = 'PIN';
                            data['auth_data'] = pin;
                            data['topupid'] = res['topupid'];
                            // $.ajax(req);
                            if (!pin) {
                                return;
                            }
                            card_payment(data);
                        }
                        // AVS (Address verification system)
                        if (res.data.suggested_auth == 'AVS_VBVSECURECODE' || res.data.suggested_auth == 'NOAUTH_INTERNATIONAL') {
                            let auth_type = res.data.suggested_auth;
                            data['auth_type'] = auth_type;
                            // data['auth_type'] = auth_type;
                            console.log('ADDRESS AUTH VERIFICATION')

                            let addr_auth_page = M.Modal.getInstance($('#addr-auth-page'));
                            addr_auth_page.open(); 

                            $('#authtype-input').val(auth_type)
                            $('#addr-topup-id-input').val(res['topupid'])
                            $('#savepm-input').val(save_payment_method)

                            // !!!TODO - GET ADDRESS
                            // $("#card-address").css({'display': 'block'});
                            // let address_data = {
                            //     "billingaddress": $("#billingaddress").val(),
                            //     "billingcity": $("#billingcity").val(),
                            //     "billingstate": $("#billingstate").val(),
                            //     "billingcountry": $("#billingcountry").val(),
                            //     "billingzip": $("#billingzip").val(),
                            // }

                            // data['auth_data'] = JSON.stringify(address_data);

                        }
                    }

                    if (res['status'] == 'success' && res['message'] == 'V-COMP') {
                        if (res['data']['chargeResponseCode'] == '02') {
                            if (res['data']['authurl'] && res['data']['authurl'] != "N/A") {
                                // location.href = res['data']['authurl'];
                                // !!!TODO - IMPLEMENT AUTH IFRAME
                                let auth_url = res['data']['authurl'].replace(/\s+/g, '');
                                // $('#auth-page > iframe').attr('src',auth_url); //og
                                
								let tx_status_modal = M.Modal.getInstance($('#tx-status-modal'));
                                tx_status_modal.close(); 
                                openAuthBrowser(auth_url)
                                // $('#auth-page').fadeIn(); //og
                                /*
                                iframetxcheck = setInterval(function(){
                                    $.get(`${SERVER_URL}/verify-payment.php?txref=sparcozm-${res['topupid']}`,function(paymentstatusres){
                                        console.log('Verify Payment in iframe')
                                        console.log(paymentstatusres);
                                    })

                                    // txref = localStorage.getItem('txid');
                                    // txref = txref.replace("sparcozm-","")
                                    $.get(`${SERVER_URL}/transaction-status.php?token=${localStorage.jwt}&txref=${res['topupid']}`, function(txstatusres){
                                        console.log('Checking Payment Status in iframe')
                                        if ((txstatusres['paymentstatus'] == 'PROCESSED') && (txstatusres['orderstatus'] == 'PROCESSED')) {
                                            clearInterval(iframetxcheck);
                                            $('#auth-page').fadeOut();

                                        }
                                        if (
                                            ((txstatusres['paymentstatus'] == 'PROCESSED') && (txstatusres['orderstatus'] == 'FAILED')) || 
                                            ((txstatusres['paymentstatus'] == 'FAILED') && (txstatusres['orderstatus'] == 'PROCESSED')) ||
                                            ((txstatusres['paymentstatus'] == 'FAILED') && (txstatusres['orderstatus'] == 'FAILED')) 
                                            ) {
                                            clearInterval(iframetxcheck);        
                                            $('#auth-page').fadeOut();
 
                                            let resrave = txstatusres.resrave;
                                            if (resrave){
                                                let resrave_json = JSON.parse(resrave)
                                                $('#err-modal-heading').text('Error Processing Payment')
                                                $('#err-modal-msg').text(`Payment failed, ${resrave_json.data.vbvmessage}`)
                                                let error_modal = M.Modal.getInstance($('#error-modal'));
                                                error_modal.open(); 
                                            }
                                        }

                                    })
                                }, 3000);
                                */

                            }
                        }

                    }

                    if (res.data.chargeResponseCode == '00' || res.data.chargeResponseCode == '0') {
                        let txRef = res.data.txRef; //Send txRef for verification
                        $.get(`${SERVER_URL}/verify-payment.php?txref=${txRef}`,function(res){
                            console.log(res);
                        })
                    }


                }
            });
    }

    if (localStorage.getItem('paymentmethod') == 'card') {
        let {ccfname, cclname, ccnum, ccexpiry, cvc}=JSON.parse(localStorage.getItem('cc_data'));

        let card_data = {
            "service": service,
            "topupnumber": topupnumber,
            "topupamount": topupamount,
            // "ccholder": `${fname} ${lname}`,
            "ccfname": ccfname,
            "cclname": cclname,
            "ccnum": ccnum.replace(/ /g, ''),
            "ccexpiry": ccexpiry.replace(/ /g, ''),
            "cvv": cvc,
            // "savepm":(save_payment_method === 'true'),
            "savepm":save_payment_method,
            "vouchertype":vouchertype,
        }
        if (is_addr_auth) {

            let address_data = {
                "billingaddress": $("#billingaddress-input").val(),
                "billingcity": $("#billingcity-input").val(),
                "billingstate": $("#billingstate-input").val(),
                "billingcountry": $("#billingcountry-input").val(),
                "billingzip": $("#billingzip-input").val(),
            }


            card_data['auth_type'] = $("#authtype-input").val();
            card_data['topupid'] = $("#addr-topup-id-input").val();
            card_data['auth_data'] = JSON.stringify(address_data);
        }
        card_payment(card_data);
    }

    let momo_data = {
        "momo_user_name": `${fname} ${lname}`,
        "momo_user_number": localStorage.getItem('momo_number'),
        "service": service,
        "topupnumber": topupnumber,
        "topupamount": topupamount,
        "savepm":save_payment_method,
        "vouchertype":vouchertype,
    }

    let momo_payment = (data)=>{

        $.ajax({
                type: 'post',
                url: `${SERVER_URL}/topup.php?pm=momo&token=${localStorage.getItem('jwt')}`,
                data: data,
                success: function (res) {
                    console.log(res)
                    if (res['data']['is_error'] || (res['message'] == "INSUFFICIENT_ACCOUNT_BALANCE")) {
                        // clearInterval(call_inner_check_transaction_status); //prevent multiple calls
                        check_transaction_status(txref=res['topupid'],error=res['data']['is_error'], error_type=res['message']);

                        reg_err(res['topupid'], res)

                    }else{
                        // clearInterval(call_inner_check_transaction_status); //prevent multiple calls
                        check_transaction_status(txref=res['topupid'], error=false, error_type='');
                    }

                    if (res.data.chargeResponseCode == '02'){
                        // alert('Pending Authorization');
                    }
                }
            });
    }

    if (localStorage.getItem('paymentmethod') == 'mobilemoney') {
        momo_payment(momo_data);
    }


}

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    let data = event.data

    if (data.action == 'redirect_res') {
         console.log('receiveMessage')
         console.log(data)
         closeIFrame(data.res);
    }
}

function closeIFrame(data=null){
    $('#auth-page').fadeOut();
    if (data) {
        console.log(data);

        let txRef = data['txRef']

        let tx_status_modal = M.Modal.getInstance($('#tx-status-modal'));
        tx_status_modal.open(); 
    

        if(data['status'] == 'failed'){
            check_transaction_status(txref=txRef, error=true, error_type='');
        }else{
            check_transaction_status(txref=txRef, error=false, error_type='');
        }

        

        $.get(`${SERVER_URL}/verify-payment.php?txref=${txRef}`,function(res){
            console.log(res);
        })
    }

}

$(document).on('click','.remove-payment-method-wrap',function(){
    let payment_method_wrap = $(this).closest('.cards-wrap');
    let payment_method_id = $(this).data('paymentMethodId');
    $.post(`${SERVER_URL}/remove-payment-method.php?token=${localStorage.getItem("jwt")}`,
        {
            payment_method_id: payment_method_id
        }, function(res){
            console.log(res)
            payment_method_wrap.remove();
        })
})

//transfers
check_transfer_status = (txref=null, error=false, error_type='',res_msg='')=>{

    localStorage.setItem('tid',txref);
    
    clearInterval(call_inner_check_transaction_status); //prevent multiple calls
    call_inner_check_transaction_status = setInterval(inner_check_transaction_status, 3000);


    if(error){
        clearInterval(call_inner_check_transaction_status);
        console.log('tx check cancelled. error')
        $('.circle-loader').addClass('load-complete'); 
        $("#inner-loader").addClass('status-cross');
        $('.load-complete').css({'border-color': '#de1c1c'});  
        $('#payment-status').text('Payment Failed');
        $('#order-status').text('Top Up Failed');
        
        $('#payment-status-msg').html(`
            <h6 class="center" style="font-weight: bold;
            ">Error Processing Payment</h6>
                <p id="err-modal-msg" style="text-align: center; color: red">${res_msg}</p>
    
                <span style="text-align: center; display: block;">Contact Us For Support:</span>
                <button class="btn-small btn-flat support-contact-btn" data-link="tel:+260975687373" style="text-align: center; display: block; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">local_phone</i>+260975687373</button>
                <button class="btn-small btn-flat support-contact-btn" data-link="mailto:support@broadpay.co.zm" style="text-align: center;  display: block; text-transform: lowercase; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">mail</i>support@broadpay.co.zm</button>
            `)
    }

    if (error && (error_type == "INSUFFICIENT_ACCOUNT_BALANCE") && !txref) {
        clearInterval(call_inner_check_transaction_status);
        console.log('transfer check cancelled')
        $('.circle-loader').addClass('load-complete'); 
        $("#inner-loader").addClass('status-cross');
        $('.load-complete').css({'border-color': '#de1c1c'});  
        $('#payment-status').text('Payment Failed');
        $('#order-status').text('Top Up Failed');
        
        $('#payment-status-msg').html(`
            <h6 class="center" style="font-weight: bold;
            ">Error Processing Payment</h6>
                <p id="err-modal-msg" style="text-align: center; color: red"> Transfer Failed Due To Insuffient Funds.</p>
    
                <span style="text-align: center; display: block;">Contact Us For Support:</span>
                <button class="btn-small btn-flat support-contact-btn" data-link="tel:+260975687373" style="text-align: center; display: block; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">local_phone</i>+260975687373</button>
                <button class="btn-small btn-flat support-contact-btn" data-link="mailto:support@broadpay.co.zm" style="text-align: center;  display: block; text-transform: lowercase; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">mail</i>support@broadpay.co.zm</button>
            `)
    }


    function inner_check_transaction_status(){ 
        let date = new Date();
        let timestamp = date.getTime();
        // console.log(`${timestamp}`);
        // let txref = JSON.parse(localStorage.purchase_data)['txref'];

        txref = localStorage.getItem('tid');
        txref = txref.replace("sparcozmt-","")

        $.get(`${SERVER_URL}/transfer-status.php?token=${localStorage.jwt}&tid=${txref}`, function(res){
            console.log(res)
            // clearInterval(call_inner_check_transaction_status);
            // return

            // console.log(res)
            // {payment_status: "PROCESSED", order_status: "FAILED", is_error: false}
            if (res['credit_status'] == 'PROCESSING') {
                $('#payment-status').text('Processing Transfer')
            }
            if (res['credit_status'] == 'PROCESSED') {
                $('#payment-status').text('Transfer Processed')
            }
            if (res['credit_status'] == 'FAILED') {
                $('#payment-status').text('Transfer Failed')
            }

            if (res['debit_status'] == 'PROCESSING') {
                $('#order-status').text('Processing Top Up')
            }
            if (res['debit_status'] == 'PROCESSED') {
                $('#order-status').text('Top Up Processed')
            }
            if (res['debit_status'] == 'FAILED') {
                $('#order-status').text('Top Up Failed')
            }
            if ((res['credit_status'] == 'PROCESSED') && (res['debit_status'] == 'PROCESSED')) {
                clearInterval(call_inner_check_transaction_status);
                console.log('transfer check cancelled')
                $('.circle-loader').addClass('load-complete');
                // $('.checkmark').toggle(); //Success                          
                $("#inner-loader").addClass('checkmark')

                // $('.load-complete').css({'border-color': '#de1c1c'})
            }
            if (
                ((res['credit_status'] == 'PROCESSED') && (res['debit_status'] == 'FAILED')) || 
                ((res['credit_status'] == 'FAILED') && (res['debit_status'] == 'PROCESSED')) ||
                ((res['credit_status'] == 'FAILED') && (res['debit_status'] == 'FAILED')) 
                ) {
                clearInterval(call_inner_check_transaction_status);
            	console.log('transfer check cancelled')
                $('.circle-loader').addClass('load-complete');
                // $('.status-cross').toggle(); //Fail      
                $("#inner-loader").addClass('status-cross')

                let resrave = res.debit_res;
                let err_msg = "Transfer Failed."
                if (resrave){
                    try {
                        let resrave_json = JSON.parse(resrave)
                        try {
                            err_msg = resrave_json.data.vbvmessage
                            // $('#err-modal-msg').text(resrave_json.data.vbvmessage)
                            if(!err_msg){
                                throw "No vbvmessage"
                            }
                        } catch (error) {
                            err_msg = resrave_json.message
                            // $('#err-modal-msg').text(resrave_json.message)
                        }         
                    } catch (error) {
                        
                    }
                }

                $('.load-complete').css({'border-color': '#de1c1c'})    
                $('#payment-status-msg').html(`
                <h6 class="center" style="font-weight: bold;
                ">Error Processing Payment</h6>
                    <p id="err-modal-msg" style="text-align: center; color: red">${err_msg}</p>
        
                    <span style="text-align: center; display: block;">Contact Us For Support:</span>
                    <button class="btn-small btn-flat support-contact-btn" data-link="tel:+260975687373" style="text-align: center; display: block; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">local_phone</i>+260975687373</button>
                    <button class="btn-small btn-flat support-contact-btn" data-link="mailto:support@broadpay.co.zm" style="text-align: center;  display: block; text-transform: lowercase; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">mail</i>support@broadpay.co.zm</button>
                `)        
            }
        })
    }
  
}

function transfer_with_saved_pm(){
 
    $('#tx-status-modal > .modal-content').html(`
            <div id="status-info-wrap">
                <div id="inner-status-info-wrap">
                    <div class="circle-loader">
                      <!-- <div class="checkmark draw"></div> -->
                      <!-- <div class="status-cross"></div> -->
                      <div id="inner-loader" class="draw"></div>
                    </div>
                    <h5 id="payment-status">Processing Transfer</h5>
                    <!-- <h5 id="order-status">Processing Order</h5> -->
                    <div id='payment-status-msg'>

                    </div>
                    <!--
                    <div id="order-pin">
                        <h6>Zesco Token</h6>
                        <p>0987654321</p>
                    </div>
                    -->
                    <!-- <p><button id="dismiss-success-fail-page-btn" type="button" class="btn btn-success">Dismiss</button></p> -->
                </div>
            </div>
        `)
    let tx_status_modal = M.Modal.getInstance($('#tx-status-modal'));
    tx_status_modal.open(); 
    
    let {pmid, recipient_name, recipient_num, amount, ref} = JSON.parse(localStorage.getItem('transfer_data'))

    let data = {
        // "pmid": pmid,
        // "source": pmid,
        "recipient_name": recipient_name,
        "destination": recipient_num,
        "amount": amount,    
        "debitservice":"card",
        "creditservice":"mtn",
        "ref":ref
    }

    console.log(data)

    $.ajax({
        type: 'post',
        url: `${SERVER_URL}/transfer.php?pm=spm&pmid=${pmid}&token=${localStorage.getItem('jwt')}`,
        data: data,
        success: function (res) {
            console.log(res)
            check_transfer_status(res['transferid'], error=false, error_type='')
        }
    })

}

function transfer_with_unsaved_pm(save_payment_method, is_addr_auth=false){

    let top_up_modal = M.Modal.getInstance($('#top-up-modal'));
    top_up_modal.close();

    $('#tx-status-modal > .modal-content').html(`
            <div id="status-info-wrap">
                <div id="inner-status-info-wrap">
                    <div class="circle-loader">
                      <!-- <div class="checkmark draw"></div> -->
                      <!-- <div class="status-cross"></div> -->
                      <div id="inner-loader" class="draw"></div>
                    </div>
                    <h5 id="payment-status">Processing Transfer</h5>
                    <!-- <h5 id="order-status">Processing Order</h5> -->
                    <div id='payment-status-msg'>

                    </div>
                    <!--
                    <div id="order-pin">
                        <h6>Zesco Token</h6>
                        <p>131313135667788</p>
                    </div>
                    -->
                    <!-- <p><button id="dismiss-success-fail-page-btn" type="button" class="btn btn-success">Dismiss</button></p> -->
                </div>
            </div>
    `)

    let tx_status_modal = M.Modal.getInstance($('#tx-status-modal'));
    tx_status_modal.open(); 

    let {pmid, recipient_name, recipient_num, amount, ref} = JSON.parse(localStorage.getItem('transfer_data'))

    let fname = localStorage.getItem("account_first_name");
    let lname = localStorage.getItem("account_last_name");

    let card_payment = (data)=>{

        // console.log('calling card')
        console.log(data)

        $.ajax({
                type: 'post',
                url: `${SERVER_URL}/transfer.php?pm=card&token=${localStorage.getItem('jwt')}`,
                data: data,
                success: function (res) {
                    if (res['is_error'] && (res['message'] == "INSUFFICIENT_ACCOUNT_BALANCE")) {
                        check_transfer_status(txref=res['transferid'],error=res['is_error'], error_type=res['message']);
                    }else{
                        check_transfer_status(txref=res['transferid'], error=false, error_type='');
                    }

                    let req = this;
                    if (res['status'] == 'error') {
                        alert(res['message']);

                        $('#payment-status-msg').html(`
                        <h6 class="center" style="font-weight: bold;
                        ">Error Processing Payment</h6>
                            <p id="err-modal-msg" style="text-align: center; color: red">${res['message']}</p>
                
                            <span style="text-align: center; display: block;">Contact Us For Support:</span>
                            <button class="btn-small btn-flat support-contact-btn" data-link="tel:+260975687373" style="text-align: center; display: block; padding: 0; margin: 0 auto;height: 20px;" ><i class="material-icons left">local_phone</i>+260975687373</button>
                            <button class="btn-small btn-flat support-contact-btn" data-link="mailto:support@broadpay.co.zm" style="text-align: center;  display: block; text-transform: lowercase; padding: 0; margin: 0 auto;height: 20px;" ><i class="material-icons left">mail</i>support@broadpay.co.zm</button>
                        `)
                        // TODO - Register Error Message in DB
                        // reg_err(res['topupid'], res)

                    }

                    if (res['status'] == 'success' && (res['message'] == 'AUTH_SUGGESTION' || res['message'] == 'V-COMP')) {
                        if (res['data']['suggested_auth'] == 'PIN') {
                            let pin = prompt('Enter Pin: ');
                            data['auth_type'] = 'PIN';
                            data['auth_data'] = pin;
                            data['topupid'] = res['topupid'];
                            // $.ajax(req);
                            if (!pin) {
                                return;
                            }
                            card_payment(data);
                        }
                        // AVS (Address verification system)
                        if (res.data.suggested_auth == 'AVS_VBVSECURECODE' || res.data.suggested_auth == 'NOAUTH_INTERNATIONAL') {
                            let auth_type = res.data.suggested_auth;
                            data['auth_type'] = auth_type;
                            // data['auth_type'] = auth_type;
                            console.log('ADDRESS AUTH VERIFICATION')

                            let addr_auth_page = M.Modal.getInstance($('#addr-auth-page'));
                            addr_auth_page.open(); 

                            $('#authtype-input').val(auth_type)
                            $('#addr-topup-id-input').val(res['topupid'])
                            $('#savepm-input').val(save_payment_method)

                            // !!!TODO - GET ADDRESS
                            // $("#card-address").css({'display': 'block'});
                            // let address_data = {
                            //     "billingaddress": $("#billingaddress").val(),
                            //     "billingcity": $("#billingcity").val(),
                            //     "billingstate": $("#billingstate").val(),
                            //     "billingcountry": $("#billingcountry").val(),
                            //     "billingzip": $("#billingzip").val(),
                            // }

                            // data['auth_data'] = JSON.stringify(address_data);
                        
                        }
                    }

                    if (res['status'] == 'success' && res['message'] == 'V-COMP') {
                        if (res['data']['chargeResponseCode'] == '02') {
                            if (res['data']['authurl'] && res['data']['authurl'] != "N/A") {
                                // location.href = res['data']['authurl'];
                                // !!!TODO - IMPLEMENT AUTH IFRAME

                                let auth_url = res['data']['authurl'].replace(/\s+/g, '');
                                // $('#auth-page > iframe').attr('src',auth_url); //og

								let tx_status_modal = M.Modal.getInstance($('#tx-status-modal'));
                                tx_status_modal.close(); 

                                openAuthBrowser(auth_url)
                                // $('#auth-page').fadeIn();
                            }
                        }

                    }

                    if (res.data.chargeResponseCode == '00' || res.data.chargeResponseCode == '0') {
                        let txRef = res.data.txRef; //Send txRef for verification
                        $.get(`${SERVER_URL}/verify-payment.php?txref=${txRef}`,function(res){
                            console.log(res);
                        })
                    }
                }
            });
    }

    if (localStorage.getItem('paymentmethod') == 'card') {
        let {ccfname, cclname, ccnum, ccexpiry, cvc}=JSON.parse(localStorage.getItem('cc_data'));

        let card_data = {
            // "source": source,
            "recipient_name": recipient_name,
            "destination": recipient_num,
            "amount": amount,
             // "ccholder": `${fname} ${lname}`,
             "ccfname": ccfname,
             "cclname": cclname,
            "ccnum": ccnum.replace(/ /g, ''),
            "ccexpiry": ccexpiry.replace(/ /g, ''),
            "cvv": cvc,
            // "savepm":(save_payment_method === 'true'),
            "savepm":save_payment_method,
            "debitservice":"card",
            "creditservice":"mtn",
            "ref":ref
        }
        if (is_addr_auth) {

            let address_data = {
                "billingaddress": $("#billingaddress-input").val(),
                "billingcity": $("#billingcity-input").val(),
                "billingstate": $("#billingstate-input").val(),
                "billingcountry": $("#billingcountry-input").val(),
                "billingzip": $("#billingzip-input").val(),
            }


            card_data['auth_type'] = $("#authtype-input").val();
            card_data['topupid'] = $("#addr-topup-id-input").val();
            card_data['auth_data'] = JSON.stringify(address_data);
        }
        card_payment(card_data);
    }

    let momo_data = {
        "momo_user_name": `${fname} ${lname}`,
        "momo_user_number": localStorage.getItem('momo_number'),
        // "source": source,
        "recipient_name": recipient_name,
        "destination": recipient_num,
        "amount": amount,
        "savepm":save_payment_method,
        "debitservice":'mtn',
        "creditservice":'mtn',
        "ref":ref
    }

    let momo_payment = (data)=>{

        $.ajax({
                type: 'post',
                url: `${SERVER_URL}/transfer.php?pm=momo&token=${localStorage.getItem('jwt')}`,
                data: data,
                success: function (res) {
                    console.log(res)
                    check_transfer_status(txref=res['transferid'],error=res['is_error'], error_type=res['message']);
    
                }
            });
    }

    if (localStorage.getItem('paymentmethod') == 'mobilemoney') {
        momo_payment(momo_data);
    }


}

//LOANS
check_loan_status = ()=>{
      
    $.get(`${SERVER_URL}/loan-status.php?token=${localStorage.getItem('jwt')}`,function(res){
        console.log(res)
        if (res['credit_status'] == 'PROCESSING') {
            $('#payment-status').text('Processing Loan')
        }
        if (res['credit_status'] == 'PROCESSED') {
            $('#payment-status').text('Loan Processed')
        }
        if (res['credit_status'] == 'FAILED') {
            $('#payment-status').text('Loan Failed')
        }

        if (res['is_error'] == true){
            $('#payment-status').text('Please Contact Support')
        }


        if (res['credit_status'] == 'PROCESSED'){

            console.log('loan check: success')
            $('.circle-loader').addClass('load-complete');                       
            $("#inner-loader").addClass('checkmark')
            $('.load-complete').css({'border-color': '#de1c1c'})    
            
        }
        if (res['credit_status'] == 'FAILED'){

            console.log('loan check: failed')
            $('.circle-loader').addClass('load-complete');
            // $('.status-cross').toggle(); //Fail      
            $("#inner-loader").addClass('status-cross')

            $('.load-complete').css({'border-color': '#de1c1c'})    
            $('#payment-status-msg').html(`
            <h6 class="center" style="font-weight: bold;
            ">Error Processing Payment</h6>
                <p id="err-modal-msg" style="text-align: center; color: red"> Loan Request Failed.</p>

                <span style="text-align: center; display: block;">Contact Us For Support:</span>
                <button class="btn-small btn-flat support-contact-btn" data-link="tel:+260975687373" style="text-align: center; display: block; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">local_phone</i>+260975687373</button>
                <button class="btn-small btn-flat support-contact-btn" data-link="mailto:support@broadpay.co.zm" style="text-align: center;  display: block; text-transform: lowercase; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">mail</i>support@broadpay.co.zm</button>
            `)        
        }

        if (res['is_error'] == true){

            console.log('loan check cancelled')
            $('.circle-loader').addClass('load-complete');
            $("#inner-loader").addClass('status-cross')

            $('.load-complete').css({'border-color': '#de1c1c'})    
            $('#payment-status-msg').html(`
            <h6 class="center" style="font-weight: bold;
            ">Error Processing Payment</h6>
                <p id="err-modal-msg" style="text-align: center; color: red"> Loan Request Failed.</p>

                <span style="text-align: center; display: block;">Contact Us For Support:</span>
                <button class="btn-small btn-flat support-contact-btn" data-link="tel:+260975687373" style="text-align: center; display: block; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">local_phone</i>+260975687373</button>
                <button class="btn-small btn-flat support-contact-btn" data-link="mailto:support@broadpay.co.zm" style="text-align: center;  display: block; text-transform: lowercase; padding: 0; margin: 0 auto;height: 30px;" ><i class="material-icons left">mail</i>support@broadpay.co.zm</button>
            `)        
        }
    })
}

function loan_from_broadpay(){
 
    $('#tx-status-modal > .modal-content').html(`
            <div id="status-info-wrap">
                <div id="inner-status-info-wrap">
                    <div class="circle-loader">
                      <!-- <div class="checkmark draw"></div> -->
                      <!-- <div class="status-cross"></div> -->
                      <div id="inner-loader" class="draw"></div>
                    </div>
                    <h5 id="payment-status">Processing Request</h5>
                    <!-- <h5 id="order-status">Processing Order</h5> -->
                    <div id='payment-status-msg'>

                    </div>
                    <!--
                    <div id="order-pin">
                        <h6>Zesco Token</h6>
                        <p>0987654321</p>
                    </div>
                    -->
                    <!-- <p><button id="dismiss-success-fail-page-btn" type="button" class="btn btn-success">Dismiss</button></p> -->
                </div>
            </div>
        `)
    let tx_status_modal = M.Modal.getInstance($('#tx-status-modal'));
    tx_status_modal.open(); 
    
    let {recipient_num, amount} = JSON.parse(localStorage.getItem('loan_data'))

    let data = {
        "destination": recipient_num,
        "amount": amount,
        "credit_service":"mtn",
    }

    console.log(data)

    $.ajax({
        type: 'post',
        url: `${SERVER_URL}/request-loan.php?token=${localStorage.getItem('jwt')}`,
        data: data,
        success: function (res) {
            console.log(res)
            if(res['is_error'] == true){
                alert(res['message'])
                tx_status_modal.close(); 
                return;
            }else{
                check_loan_status()
            }
        }
    })
}

function test_without_scan() {

    var qr_array = ['bpsparcp', 1, 'Nando’s', 'Manda Hill'];

    // open_transaction_overlay('no_amount', qr_array);

}

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

function do_scan() {
    let coming_soon_modal = M.Modal.getInstance($('#coming-soon-modal'));
    coming_soon_modal.open(); 

    /*
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            alert("We got a barcode\n" +
                  "Result: " + result.text + "\n" +
                  "Format: " + result.format + "\n" +
                  "Cancelled: " + result.cancelled);
        },
        function (error) {
            // alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : false, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt : "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS and Android
        }
    );
    */
}
