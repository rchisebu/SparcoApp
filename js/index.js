
$('#cc-form').card({
    // a selector or DOM element for the container
    // where you want the card to appear
    container: '.card-wrapper', // *required*
    width: 300,

    // all of the other options from above
});

$(".pin-code-wrap input").jqueryPincodeAutotab({
    prevElement: null,
    nextElement: null,
    defaultFlow: true
});

$('#open-pm-page').on('click', function(){
    let sidenav = document.querySelector('.sidenav');
    
    let instance = M.Sidenav.getInstance(sidenav);
    instance.close();
    $('#pm-list-wrap').empty()
    $('#pm-page-loader').css({'display':'block'})

    $('#pm-page').fadeIn();

    $.get(`${SERVER_URL}/get-saved-cards.php?token=${localStorage.getItem("jwt")}`, function(payment_methods) {

        $('#pm-page-loader').css({'display':'none'})

        // console.log(payment_methods);
        payment_methods.forEach((payment_method)=>{
                // console.log(card)
                let payment_method_id = payment_method['id'];
                let payment_method_logo, payment_method_name, payment_method_number = '';

                if (payment_method['payment_method'] == 'card') {
                    payment_method_logo = `${payment_method['card_type'].toLowerCase()}_logo.png`;
                    payment_method_number = `&#8226;&#8226;&#8226;&#8226;${payment_method['ldigits']}`;
                    payment_method_name = `${payment_method['card_type'].toLowerCase()}`; 
                }
                if (payment_method['payment_method'] == 'mtn_money') {
                    payment_method_logo = `${payment_method['payment_method']}_logo.png`;
                    payment_method_number = `${payment_method['phone']}`;
                    payment_method_name = `${payment_method['payment_method'].replace('_', ' ').toLowerCase()}`; 
                }
                $('#pm-list-wrap').append(`
                    <div class="cards-wrap">
                        <div class="payment-method-wrap" data-payment-method-id="${payment_method_id}">
                            <div class="payment-method-img-wrap">
                                <img class="payment-method-img" src="./img/payment_methods/${payment_method_logo}">
                            </div>
                            <div class="payment-method-text-wrap">
                                <h6 style="margin: 0; color: #039be5;text-transform: capitalize; text-align: left;">${payment_method_name}</h6>
                                <span style="margin: 0; color: #039be5;">${payment_method_number}</span>
                            </div>
                            <div class="remove-payment-method-wrap" data-payment-method-id="${payment_method_id}">
                                <i class="large material-icons">close</i>
                            </div>
                        </div>
                    </div>
                    `)      
            }
        )
    })

})

$('#dismiss-pm-page').on('click', function(){
    $('#pm-page').fadeOut();
})

$('#open-tx-page').on('click', function(){
    $('#transactions').empty()
    let sidenav = document.querySelector('.sidenav');
    
    let instance = M.Sidenav.getInstance(sidenav);
    instance.close();

    $('#tx-page-loader').css({'display':'block'})

    $('#tx-page').fadeIn();

    $.get(`${SERVER_URL}/activity-info.php?token=${localStorage.jwt}`, function(transactions){
        // console.log(transactions);
        $('#tx-page-loader').css({'display':'none'})
        
        transactions.forEach(function(transaction){
            let {id:id, datetime: server_time, service: service_name, topupnumber: topupnumber, topupcode: code, amount: amount} = transaction;
            let tx_service = '';
            let tx_token = '';
            if (service_name == 'zesco') {
                tx_service = 'Meter Number: ';
                tx_token = code;
            }
            if ((service_name == 'mtn') || (service_name == 'airtel') || (service_name == 'zamtel')) {
                tx_service = `${service_name.toUpperCase()} Number: `;
            }
            if ((service_name == 'gotv') || (service_name == 'dstv')) {
                tx_service = `${service_name.toUpperCase()} Smartcard: `;
            }
            $('#transactions').append(`
                <li class="collection-item transaction">
                    <div class="transaction-info-left">
                        <div class="transaction-recipient">
                            <span>${(tx_token ? `Meter Number: ` : tx_service)} ${topupnumber}</span>
                            <span>${(tx_token ? `Zesco Token: ` : '')} ${tx_token}</span>
                        </div>
                        <div class="transaction-id-date">
                            <span class="transaction-date">${server_time}</span>
                        </div>
                    </div>
                    <div class="transaction-info-right">
                        <!--
                        <span class="transaction-service">
                            <span>${tx_service}</span>
                            <span>${(tx_token ? `Zesco Token: ` : '')}</span>
                        </span>
                        -->
                        <span class="transaction-amount taller">ZMW ${amount.replace('.00', '')}</span>
                        <span class="transaction-id">Tx Ref: sparcozm-${id}</span> 
                    </div>
                </li>
                `)
        })
    })
})

$('#dismiss-tx-page').on('click', function(){
    $('#tx-page').fadeOut();
})

$('#open-profile-page').on('click', function(){
    let sidenav = document.querySelector('.sidenav');
    
    let instance = M.Sidenav.getInstance(sidenav);
    instance.close();

    $("#user-info-wrap").empty();

    $('#checking-user-details-loader').css({'display':'block'})

    $('#profile-page').fadeIn();

    let add_user_info = (user)=>{
            $("#user-info-wrap").html(`
                <div id="inner-user-info-wrap">
                    <div class="user-value-title-wrap">
                        <span class="user-value-title">
                            <!-- <i class="material-icons">account_circle</i> -->
                            <span id="user-fname" class="user-value">${user['first_name']}</span>
                            <span class="user-title">first name</span> 
                        </span>
                        <i id="edit-user-fname" class="material-icons btn-flat">edit</i>
                    </div>
                    <div class="user-value-title-wrap">
                        <span class="user-value-title">
                            <!-- <i class="material-icons">account_circle</i> -->
                            <span id="user-lname" class="user-value">${user['last_name']}</span>
                            <span class="user-title">last name</span> 
                        </span>
                        <i id="edit-user-lname" class="material-icons btn-flat">edit</i>
                    </div>
                    <div class="user-value-title-wrap">
                        <span class="user-value-title">
                            <!-- <i class="material-icons">account_circle</i> -->
                            <span id="user-email" class="user-value">${user['email']}</span>
                            <span class="user-title">email</span> 
                        </span>
                        <i id="edit-user-email" class="material-icons btn-flat">edit</i>
                    </div>
                    <div class="user-value-title-wrap">
                        <span class="user-value-title">
                            <!-- <i class="material-icons">account_circle</i> -->
                            <span id="profile-user-phone" class="user-value">${user['phone']}</span>
                            <span class="user-title">phone</span> 
                        </span>
                        <i id="edit-user-phone" class="material-icons btn-flat">edit</i>
                    </div>
                    <div class="user-value-title-wrap">
                        <span class="user-value-title">
                            <!-- <i class="material-icons">account_circle</i> -->
                            <span id="user-pw" class="user-value">****</span>
                            <span class="user-title">pass code</span> 
                        </span>
                        <i id="edit-user-pw" class="material-icons btn-flat">edit</i>
                    </div>
                </div>
                `)
    }

    let get_user_profile = ()=>{

        // $.get(`https://sparco.io/profile-info.php?token=${localStorage.jwt}`, function(user){
        $.get(`${SERVER_URL}/profile-info.php?token=${localStorage.jwt}`, function(user){
        // $.get(`http://127.0.0.1/sparco/profile.php?token=${localStorage.jwt}`, function(user){
            // console.log(user);
            $('#checking-user-details-loader').css({'display':'none'})
            add_user_info(user);

        })

    }

    get_user_profile()
})

$('#dismiss-profile-page').on('click', function(){
    $('#profile-page').fadeOut();
})


$('#open-support-page').on('click', function(){
    let support_modal = M.Modal.getInstance($('#support-modal'));
    support_modal.open(); 

    let sidenav = document.querySelector('.sidenav');
    
    let instance = M.Sidenav.getInstance(sidenav);
    instance.close();
})


$(document).on("click", "#edit-user-fname", function(){

    let user_details_modal = M.Modal.getInstance($('#user-details-modal'));
    user_details_modal.open();


    $("#user-details-modal > .modal-content").html(`
            <div id="user-profile-wrap">
                    <div class="input-field col s6">
                        <!-- <i class="material-icons prefix">phone_android</i> -->
                        <input id="fname_input" type="text" class="validate" value="${$('#user-fname').text().trim()}" >
                        <label class="active" for="fname_input">First Name</label>
                    </div>
                    <div id="user-profile-btns-wrap" class="input-field col s6">
                        <a class="btn waves-effect waves-light btn-small save-profile-info-btn sparco-blue"  data-input="fname">Save</a>
                    </div>
            </div>
        `);
})

$(document).on("click", "#edit-user-lname", function(){

    let user_details_modal = M.Modal.getInstance($('#user-details-modal'));
    user_details_modal.open();

    $("#user-details-modal > .modal-content").html(`
            <div id="user-profile-wrap">
                    <div class="input-field col s6">
                        <input id="lname_input" type="text" class="validate" value="${$('#user-lname').text().trim()}">
                        <label class="active" for="lname_input">Last Name</label>
                    </div>
                    <div id="user-profile-btns-wrap" class="input-field col s6">
                        <a id="save-lname" class="btn waves-effect waves-light btn-small save-profile-info-btn sparco-blue">Save</a>		
                    </div>
            </div>
        `);
})

$(document).on("click","#edit-user-email",function(){


    let user_details_modal = M.Modal.getInstance($('#user-details-modal'));
    user_details_modal.open();

    $("#user-details-modal > .modal-content").html(`
            <div id="user-profile-wrap">
                    <div class="input-field col s6">
                        <input id="email_input" type="text" class="validate" value="${$('#user-email').text().trim()}">
                        <label class="active" for="email_input">Email</label>
                    </div>
                    <div id="user-profile-btns-wrap" class="input-field col s6">
                        <a id="save-email" class="btn waves-effect waves-light btn-small save-profile-info-btn sparco-blue">Save</a>	
                    </div>
            </div>
        `);
})

$(document).on("click", "#edit-user-phone", function(){

    let user_details_modal = M.Modal.getInstance($('#user-details-modal'));
    user_details_modal.open();

    $("#user-details-modal > .modal-content").html(`
            <div id="user-profile-wrap">
                    <div class="input-field col s6">
                        <input id="phone_input" type="text" class="validate" value="${$('#profile-user-phone').text().trim()}">
                        <label class="active" for="phone_input">Phone Number</label>
                    </div>
                    <div id="user-profile-btns-wrap" class="input-field col s6">
                        <a id="save-email" class="btn waves-effect waves-light btn-small save-profile-info-btn sparco-blue">Save</a>		
                    </div>
            </div>
        `);
})

$(document).on("click", "#edit-user-pw", function(){

    let user_details_modal = M.Modal.getInstance($('#user-details-modal'));
    user_details_modal.open();

    $("#user-details-modal > .modal-content").html(`
        <div id="user-profile-wrap" style="height: 265px !important;">
                <div class="input-field col s6">
                    <input id="cur_pw_input" type="password" class="validate" >
                    <label class="active" for="cur_pw_input">Current Passcode</label>
                </div>
                <div class="input-field col s6">
                    <input id="new_pw_input" type="password" class="validate">
                    <label class="active" for="new_pw_input">New Passcode</label>
                </div>
                <div class="input-field col s6">
                    <input id="new_pw2_input" type="password" class="validate">
                    <label class="active" for="new_pw2_input">Cofirm New Password</label>
                </div>
                <div id="user-profile-btns-wrap" class="input-field col s6">
                    <a id="save-new-pw-btn" class="btn waves-effect waves-light btn-small sparco-blue">Save</a>	
                </div>
        </div>
        `);
})

$('#open-about-page').on('click', function(){
    let sidenav = document.querySelector('.sidenav');
    
    let instance = M.Sidenav.getInstance(sidenav);
    instance.close();

    $('#about-page').fadeIn();
})

$('#dismiss-about-page').on('click', function(){
    $('#about-page').fadeOut();
})

$('#open-add-card-page').on('click', function(){
    // let sidenav = document.querySelector('.sidenav');
    
    // let instance = M.Sidenav.getInstance(sidenav);
    // instance.close();


    $('#add-card-page').fadeIn();
})

$('#dismiss-add-card-page').on('click', function(){
    // $('#add-card-page').fadeOut();
    let ccp = M.Modal.getInstance($('#add-card-page'));
    ccp.close()
})

$('#dismiss-addr-auth-page').on('click', function(){
    // $('#add-card-page').fadeOut();
    let addr_auth_page = M.Modal.getInstance($('#addr-auth-page'));
    addr_auth_page.close()
})

$('#dismiss-auth-page').on('click', function(){
    $('#auth-page').fadeOut();
})

$('.service-transfers').on('click', function(){

    localStorage.setItem('service_type', 'money_transfer')

    let sidenav = document.querySelector('.sidenav');
    /*
    $('#dialpad-inner-wrap').html(`
        <div class="input-field col s12">
            <input value="Mundia Mwala" id="dialpad-tab-name" type="text" class="validate">
            <label class="active" for="dialpad-tab-name">Recipient's Name</label>
        </div>
        <div class="input-field col s12">
            <input value="0961453688" id="dialpad-tab-transfer-num" type="tel" class="validate">
            <label class="active" for="dialpad-tab-transfer-num">Recipient's Mobile Money Number(MTN/Airtel)</label>
        </div>
        <div class="input-field col s12">
            <input value="10" id="dialpad-tab-transfer-amount" type="number" class="validate">
            <label class="active" for="dialpad-tab-transfer-amount">Enter Amount(ZMW)</label>
        </div>
        <div class="col s12 select-funding-source btn-flat" style="border-bottom: 1px solid #9e9e9e; margin-bottom: 10px; padding: 10px;height: 46px; width: 100%;">
            <span style="color: #9e9e9e;">
                Select Funding Source
            </span>
            <i class="material-icons right">arrow_drop_down</i>
        </div>			
        <button class="btn sparco-blue align-center sparco-center-btn dial-pad-transfer-checkout-btn">
            Proceed
            <i class="material-icons right">arrow_forward</i>
        </button>	
    `)
    */
    
    let coming_soon_modal = M.Modal.getInstance($('#coming-soon-modal'));
    coming_soon_modal.open();  
    return;


    $('#dialpad-inner-wrap').html(`
        <div id="dialpad-tab-name-input-wrapper" class="input-field col s12 animated fadeIn slow"  style="display: none;">
            <input value="" id="dialpad-tab-name" type="text" class="validate">
            <label class="active" for="dialpad-tab-name">Recipient's Name</label>
        </div>
        <div id="dialpad-tab-transfer-num-input-wrapper" class="input-field col s12 animated fadeIn slow">
            <!-- <i class="material-icons prefix">phone</i> -->
            <input value="" id="dialpad-tab-transfer-num" type="tel" class="validate">
            <label class="active" for="dialpad-tab-transfer-num">Recipient's Phone Number</label>
            <button id="get-contact-btn" class="waves-effect waves-light btn-flat sparco-blue white-text" style="position: absolute; top: 5px; right: 0;"><i class="material-icons">contacts</i></button>
        </div>
        <div id="dialpad-tab-transfer-amount-input-wrapper" class="input-field col s12 animated fadeIn slow" style="display: none;">
            <input value="" id="dialpad-tab-transfer-amount" type="number" class="validate">
            <label class="active" for="dialpad-tab-transfer-amount">Enter Amount(ZMW)</label>
        </div>
        <div class="col s12 select-funding-source btn-flat animated fadeIn slow" style="border-bottom: 1px solid #9e9e9e; margin-bottom: 10px; padding: 10px; height: 46px; width: 100%; display: none;">
            <span style="color: #9e9e9e;">
                Select Funding Source
            </span>
            <i class="material-icons right">arrow_drop_down</i>
        </div>
        <!--			
        <button class="btn sparco-blue align-center sparco-center-btn dial-pad-transfer-checkout-v2-btn animated fadeIn slow">
            Proceed
            <i class="material-icons right">arrow_forward</i>
        </button>
        -->				
        <button class="btn sparco-blue align-center sparco-center-btn dial-pad-transfer-checkout-btn">
            Proceed
            <i class="material-icons right">arrow_forward</i>
        </button>	
        `)
    
    let instance = M.Sidenav.getInstance(sidenav);
    instance.close();

    $('#contacts-page').fadeIn();
})

$(document).on('click', '.dial-pad-transfer-checkout-btn', function(){

    if($('#dialpad-tab-name-input-wrapper').css('display') == 'none'){
        $('#dialpad-tab-name-input-wrapper').css('display', 'block')
        $('#dialpad-tab-topup-amount-input-wrapper').css({display: 'block'})
        $('.select-funding-source').css({display: 'block'})
        return
    }

    // alert('test')
    let recipient_name = $('#dialpad-tab-name').val();
    let recipient_num = $('#dialpad-tab-transfer-num').val();
    let amount = $('#dialpad-tab-transfer-amount').val();
    let pm_id = $('.select-funding-source').data('payment-method-id')

    // console.log(recipient_name)
    // console.log(recipient_num)
    // console.log(amount)
    if(!recipient_name){
        alert('Recipient name is required')
        return
    }
    if(!recipient_num){
        alert('Recipient number is required')
        return
    }
    if(!amount){
        alert('Amount is required')
        return
    }
    if(!pm_id){
        alert('Funding source method is required')
        return
    }
    let transfer_data = JSON.stringify({
        'pmid':pm_id,
        'recipient_name':recipient_name,
        'recipient_num':recipient_num,
        'amount':amount,
    })
    localStorage.setItem('transfer_data',transfer_data)


    // pay_with_saved_pm()

    if (pm_id == 'new') {
        console.log('transfer_with_unsaved_pm')
        // pay_with_unsaved_pm(save_payment_method='false')
        show_save_pm_dialog()
    }else{
        console.log('transfer_with_saved_pm')
        console.log(`PM ID: ${pm_id}`)
        transfer_with_saved_pm()
    }

})

$('#dismiss-transfers-page').on('click', function(){
    $('#contacts-page').fadeOut();
})

$('.service-topup').on('click', function(){

    

    localStorage.setItem('service_type', 'bill_payment')

    let sidenav = document.querySelector('.sidenav');
    let instance = M.Sidenav.getInstance(sidenav);
    instance.close();

    // $('.contacts-loader-wrap').css({'display':'flex'})
    /*
    $('#dialpad-inner-wrap').html(`
        <div class="input-field col s12">
            <input value="" id="dialpad-tab-topup-num" type="tel" class="validate">
            <label class="active" for="dialpad-tab-topup-num">Enter Number</label>
        </div>
        <div class="input-field col s12">
            <input value="" id="dialpad-tab-topup-amount" type="number" class="validate">
            <label class="active" for="dialpad-tab-topup-amount">Enter Amount</label>
        </div>			
        <div class="col s12 select-funding-source btn-flat" style="border-bottom: 1px solid #9e9e9e; margin-bottom: 10px; padding: 10px; height: 46px; width: 100%;">
            <span style="color: #9e9e9e;">
                Select Funding Source
            </span>
            <i class="material-icons right">arrow_drop_down</i>
        </div>

        <button class="btn sparco-blue align-center sparco-center-btn dial-pad-topup-checkout-btn">
            Proceed
            <i class="material-icons right">arrow_forward</i>
        </button>	
    `)
    */
    $('#dialpad-inner-wrap').html(`
        <div id="dialpad-tab-name-input-wrapper" class="input-field col s12 animated fadeIn slow"  style="display: none;">
            <input value="" id="dialpad-tab-name" type="text" class="validate">
            <label class="active" for="dialpad-tab-name">Recipient's Name</label>
        </div>
        <div id="dialpad-tab-topup-num-input-wrapper" class="input-field col s12 animated fadeIn slow">
            <!-- <i class="material-icons prefix">phone</i> -->
            <input value="" id="dialpad-tab-topup-num" type="tel" class="validate">
            <label class="active" for="dialpad-tab-topup-num">Recipient's Phone Number</label>
            <button onclick=getContact() id="get-contact-btn" class="waves-effect waves-light btn-flat sparco-blue white-text" style="position: absolute; top: 5px; right: 0;"><i class="material-icons">contacts</i></button>
        </div>
        <div id="dialpad-tab-topup-amount-input-wrapper" class="input-field col s12 animated fadeIn slow" style="display: none;">
            <input value="" id="dialpad-tab-topup-amount" type="number" class="validate">
            <label class="active" for="dialpad-tab-topup-amount">Enter Amount(ZMW)</label>
        </div>
        <div class="col s12 select-funding-source btn-flat animated fadeIn slow" style="border-bottom: 1px solid #9e9e9e; margin-bottom: 10px; padding: 10px; height: 46px; width: 100%; display: none;">
            <span style="color: #9e9e9e;">
                Select Funding Source
            </span>
            <i class="material-icons right">arrow_drop_down</i>
        </div>	
        <!--		
        <button class="btn sparco-blue align-center sparco-center-btn dial-pad-topup-checkout-v2-btn animated fadeIn slow">
            Proceed
            <i class="material-icons right">arrow_forward</i>
        </button>	
        -->
        <button onclick=topUpCheckOut() class="btn sparco-blue align-center sparco-center-btn dial-pad-topup-checkout-btn">
            Proceed
            <i class="material-icons right">arrow_forward</i>
        </button>	
        `)
    M.updateTextFields();

    $('#contacts-page').fadeIn();

    // document.querySelector('.dial-pad-topup-checkout-btn').addEventListener("click", topUpCheckOut, false)
    // document.querySelector('#get-contact-btn').addEventListener("click", getContact, false)

    // #get-contact-btn

    /*
    navigator.contactsPhoneNumbers.list(function(contacts) {
        console.log(contacts.length + ' contacts found');
        for(var i = 0; i < contacts.length; i++) {
            console.log(contacts[i].id + " - " + contacts[i].displayName);
            for(var j = 0; j < contacts[i].phoneNumbers.length; j++) {
            var phone = contacts[i].phoneNumbers[j];
            console.log("===> " + phone.type + "  " + phone.number + " (" + phone.normalizedNumber+ ")");

            }

        $('#contacts_list').show()
        $('.contacts-loader-wrap').hide()

        $('#contacts_list').append(`
            <li class="collection-item avatar">
                <i class="material-icons circle">perm_identity</i>
                <span class="title">${ contacts[i].displayName}</span>
                <p>${contacts[i].phoneNumbers[0].normalizedNumber}</p>
            </li>   
            `)
        }
    }, function(error) {
        console.error(error);
        $('.contacts-loader-wrap').hide();
        $('.contacts-error-wrap').css({'display': 'flex'})
    });
    */
})

$('#dismiss-contacts-page').on('click', function(){
    $('#contacts-page').fadeOut();
})

$('.service-loans').on('click', function(){

    // $('#contacts-page').fadeIn();
    // let loan_modal = M.Modal.getInstance($('#loan-modal'));
    // loan_modal.open();

    let coming_soon_modal = M.Modal.getInstance($('#coming-soon-modal'));
    coming_soon_modal.open();  

})

$('#loan-request').on('click',function(){
    let loan_modal = M.Modal.getInstance($('#loan-modal'));
    loan_modal.close();

    let loan_request_modal = M.Modal.getInstance($('#loan-request-modal'));
    loan_request_modal.open();

})

$(document).on('click','#request-loan-btn', function(){
    let loan_amount = $('#loan-request-amount-input').val()
    let pm_id = $('.select-funding-source').data('payment-method-id')

    if (!pm_id) {
        alert('Funding Source is required.')
        let loan_request_modal = M.Modal.getInstance($('#loan-request-modal'));
        loan_request_modal.open();
    }else if(pm_id){
        let loan_request_modal = M.Modal.getInstance($('#loan-request-modal'));
        loan_request_modal.close();

        let loan_request_confirmation_modal = M.Modal.getInstance($('#loan-request-confirmation-modal'));
        loan_request_confirmation_modal.open();
    }	

    if (!loan_amount) {
        alert('Please Enter Loan Amount.')
        let loan_request_modal = M.Modal.getInstance($('#loan-request-modal'));
        loan_request_modal.open();
    }else if(loan_amount){
        let loan_request_modal = M.Modal.getInstance($('#loan-request-modal'));
        loan_request_modal.close();
        
        let loan_request_confirmation_modal = M.Modal.getInstance($('#loan-request-confirmation-modal'));
        loan_request_confirmation_modal.open();
    }
})

// $('#request-loan-btn').on('click',function(){


    

// })

$('#loan-repay').on('click',function(){
    let loan_modal = M.Modal.getInstance($('#loan-modal'));
    loan_modal.close();

    let loan_repay_modal = M.Modal.getInstance($('#loan-repay-modal'));
    loan_repay_modal.open();

})

$('.service-data').on('click',function(){

    localStorage.setItem('service_type', 'bill_payment')

    // let data_modal = M.Modal.getInstance($('#data-modal'));
    // data_modal.open();  
    let coming_soon_modal = M.Modal.getInstance($('#coming-soon-modal'));
    coming_soon_modal.open();  
})

$('.service-tv').on('click', function(){

    localStorage.setItem('service_type', 'bill_payment')

    // $('#contacts-page').fadeIn();
    let tv_modal = M.Modal.getInstance($('#tv-modal'));
    tv_modal.open();

})

$('#dstv-topup').on('click',function(){
    let tv_modal = M.Modal.getInstance($('#tv-modal'));
    tv_modal.close();

    $('#tv-service-input').val('DStv')

    let tv_topup_modal = M.Modal.getInstance($('#tv-top-up-modal'));
    tv_topup_modal.open();

    // Test Smartcard Number
    // $('#smart-card-number-input').val("42906098506")
})

$('#gotv-topup').on('click',function(){
    let tv_modal = M.Modal.getInstance($('#tv-modal'));
    tv_modal.close();

    $('#tv-service-input').val('GOtv')

    let tv_topup_modal = M.Modal.getInstance($('#tv-top-up-modal'));
    tv_topup_modal.open();
    // Test IUC Number 
    // $('#smart-card-number-input').val("4623909324")
})

$('.service-electricity').on('click', function(){

    localStorage.setItem('service_type', 'bill_payment')

    // $('#contacts-page').fadeIn();
    let electricity_modal = M.Modal.getInstance($('#electricity-modal'));
    electricity_modal.open();

})
// $('.select-funding-source').on('click',function(){
// 	let funding_source_modal = M.Modal.getInstance($('#funding-source-modal'));
// 	funding_source_modal.open();
// })
$(document).on('click','.select-funding-source',function(){
    // let saved_pms = get_saved_pms();
    // $('#saved-pm-list').html(saved_pms);
    get_saved_pms()
    let funding_source_modal = M.Modal.getInstance($('#funding-source-modal'));
    funding_source_modal.open();
})

$(document).on('click','.payment-method', function(){
    let funding_source_modal = M.Modal.getInstance($('#funding-source-modal'));
    funding_source_modal.close();
    // console.log($(this).text())
    $('.select-funding-source > span').text($(this).text())
    // console.log($(this).data('payment-method-id'))
    $('.select-funding-source').data('payment-method-id', $(this).data('payment-method-id'))
})

$('#add-card-pm').on('click', function(){
    let pm_type_modal = M.Modal.getInstance($('#pm-type-modal'));
    pm_type_modal.close();
    // alert('add Card')	
    // let card_details_modal = M.Modal.getInstance($('#card-details-modal'));
    // card_details_modal.open();

    let top_up_amount = $('#final-top-up-amount-input').val();
    let top_up_network = $('#final-top-up-network-input').val();
    let top_up_pm = $('#final-top-up-pm');
    let top_up_num = $('#final-top-up-num-input').val();

    let top_up_data = JSON.stringify({
        'top_up_num':top_up_num,
        'top_up_network':top_up_network,
        'top_up_amount':top_up_amount,
    })

    // console.log(top_up_data)

    localStorage.setItem("top_up_data", top_up_data)

    // let top_up_modal = M.Modal.getInstance($('#top-up-modal'));
    // top_up_modal.close();

    // $('#add-card-page').css({'display':'block'})

    // Test Card Data 
    // $('#cc-num').val('5399 8383 8383 8381')
    // $('#cc-name').val('Mundia Mwala')
    // $('#cc-expiry').val('08/24')
    // $('#cvc').val('470')


    let ccp = M.Modal.getInstance($('#add-card-page'));
    ccp.open()
})

$('#add-mtn-pm').on('click', function(){
    let pm_type_modal = M.Modal.getInstance($('#pm-type-modal'));
    pm_type_modal.close();
    // alert('add MTN Money')
    // let card_details_modal = M.Modal.getInstance($('#card-details-modal'));
    // card_details_modal.open();
    let mtn_money_details_modal = M.Modal.getInstance($('#add-mtn-money-modal'));
    mtn_money_details_modal.open(); 
})

$('#cc-form').on('submit',function(e) {
    e.preventDefault();
})

$('#close-code-input-page').on('click',function() {
    $('#code-input-page').fadeOut();
    $('#login-page').css({'display': 'flex'});

})

$('#logout-btn').on('click',function(){
    let sidenav = document.querySelector('.sidenav');
    
    let instance = M.Sidenav.getInstance(sidenav);
    instance.close();


    localStorage.clear();
    sessionStorage.clear();

    $('#login-page').css({'display': 'flex'});
    $('#home-page').css({'display': 'none'}); 
})



$(document).on('click','.topup-checkout-btn', function() {
    // alert('Process Top')
    let top_up_amount = $('#final-top-up-amount-input').val();
    let top_up_network = $('#final-top-up-network-input').val();
    let top_up_pm = $('#final-top-up-pm');
    let top_up_num = $('#final-top-up-num-input').val();

    let pm_id = $('#final-top-up-pm').data('payment-method-id');

    // console.log(`PM ID: ${pm_id}`)
    // console.log(`Top Up Num: ${top_up_num}`)
    // console.log(`Top Up Network: ${top_up_network}`)
    // console.log(`Top Up Amount: ${top_up_amount}`)

    if (!top_up_amount) {
        alert('Top Up amount is required.')
        return;
    }
    if (!pm_id) {
        alert('Funding Source is required.')
        return;
    }

    // TODO
    // !!!PROCESS SAVED PM
    let top_up_data = JSON.stringify({
        'pmid':pm_id,
        'topupnumber':top_up_num,
        'service':top_up_network,
        'topupamount':top_up_amount,
    })
    localStorage.setItem('top_up_data',top_up_data)


    // pay_with_saved_pm()

    if (pm_id == 'new') {
        console.log('pay with unsaved pm')
        // pay_with_unsaved_pm(save_payment_method='false')
        show_save_pm_dialog()
    }else{
        console.log('pay with saved pm')
        pay_with_saved_pm()
    }

    // console.log(top_up_data)

    // localStorage.setItem("top_up_data", top_up_data)

    // localStorage.setItem("has_step_after_pm_add", "yes")
})

// $(document).on('click','.dial-pad-topup-checkout-btn',function(e) {


$(document).on('click','.add-card-btn', function() {
    $('#add-card-page').fadeOut()
    let cc_num = $('#cc-num').val()
    let cc_name = $('#cc-name').val()
    let cc_expiry = $('#cc-expiry').val()
    let cvc = $('#cvc').val()

    // let top_up_data = localStorage.getItem('top_up_data');


    localStorage.setItem('cc_data',JSON.stringify({
        'ccnum':cc_num,
        'ccexpiry':cc_expiry,
        'cvc':cvc,
    }))
    localStorage.setItem('paymentmethod','card')

    // Note
    // if payment-method-id == 0 then the pm is not saved
    let partial_cc_num = `••••${cc_num.replace(/ /g, '').slice(-4)}`
    $('.select-funding-source > span').text(partial_cc_num)
    $('.select-funding-source').data('payment-method-id', 'new')

    // console.log(cc_num)
    // console.log(cc_name)
    // console.log(cc_expiry)
    // console.log(cvc)
    // console.log(top_up_data)
    // TODO
    // !!!PROCESS PAYMENT UNSAVED

    // $('#add-card-page').fadeOut()

    let ccp = M.Modal.getInstance($('#add-card-page'));
    ccp.close()

    // if (localStorage.getItem('top_up_modal_is_next') == 'yes') {

    // }
})

$(document).on('click','.add-momo-btn', function() {
    let momo_num = $('#mtn-money-number-input').val()

    if (!momo_num) {
        alert('MTN Money Number is required');
        return;
    }

    localStorage.setItem('momo_number', momo_num)
    localStorage.setItem('paymentmethod','mobilemoney')

    $('.select-funding-source > span').text(`MTN Money ${momo_num}`)
    $('.select-funding-source').data('payment-method-id', 'new')

    let mtn_money_details_modal = M.Modal.getInstance($('#add-mtn-money-modal'));
    mtn_money_details_modal.close(); 

})

//loans


// Electricity
// Untested
// $(document).on('click','#meter-number-btn', function(){
// $('#meter-number-btn').on('click',function(){

// TV
$(document).on('click', '#check-tv-balance-btn', function(){

    $('#tv-loading-wrap').html(`
    <img src="img/dloading.gif" height="40" />
    `)

    let service = $('#tv-service-input').val()
    let smart_card_num = $('#smart-card-number-input').val()

    $('#check-tv-balance-btn').attr('disabled', false)

    $.getJSON(`${SERVER_URL}/543/tv_topup.php`, {
        operation: 'getbalance',
        serviceProvider: service,
        smartCardNum: smart_card_num
    }).done(function (data) {
        // var top_up_amount = prompt("Enter amount to top up:",data['amountDue']);

        let amount_due = data['amountDue']
        $('#tv-amount-due-input').val(amount_due)

        $('#tv-amount-due-input').css({'display':'block'})
        $('#tv-loading-wrap').empty()

        $('#check-tv-balance-btn').attr('disabled', true)
        $('#check-tv-balance-btn').fadeOut()
        $('#smart-card-number-btn').css({'display':'block'})

        $('#tv-modal-select-funding-source').css({'display':'block'})

        /*
        console.log(JSON.stringify(data))
        let msg = ''
        if (parseInt(amountDue) > 0) {
            msg = `
            <p>
                The amount due is: <b>ZMW ${amountDue}</b>
            </p>
            `
        }else{
            amountDue = ''
        }

        $('#modalservice > .modal-content').html(`
            ${msg}
            <input id="top-up-amount-input" type="number" class="validate" placeholder="Enter Amount Number" value="${amountDue}">
            <input id="service-input" type="hidden" value="${service}">
            <input id="smart-card-number-input" type="hidden" value="${smartCardNum}">
            <button id="tv-pay-btn" class="btn waves-effect waves-light">proceed
                <i class="material-icons right">arrow_forward</i>
            </button>
        `)

        */
    });
})

$(document).on('click', '#tv-modal-select-funding-source', function(){
    // let service = $('#tv-service-input').val()
    // let smart_card_num = $('#smart-card-number-input').val()
    // let pm_id = $('.select-funding-source').data('payment-method-id')
})

$('#smart-card-number-btn').on('click', function(){
    let smart_card_num = $('#smart-card-number-input').val()
    let service = $('#tv-service-input').val()
    let top_up_amount = $('#tv-amount-due-input').val()
    let pm_id = $('.select-funding-source').data('payment-method-id')

    if (!pm_id) {
        alert('Funding Source is required.')
        return;
    }
    if (!smart_card_num) {
        alert('Smart card number is required.')
        return;
    }

    if (!top_up_amount) {
        alert('Top Up amount is required.')
        return;
    }
    let top_up_data = JSON.stringify({
        'pmid':pm_id,
        'topupnumber':smart_card_num,
        'service':service,
        'topupamount':top_up_amount,
    })

    localStorage.setItem('top_up_data',top_up_data)
    if (pm_id == 'new') {
        console.log('pay_with_unsaved_pm')
        // pay_with_unsaved_pm(save_payment_method='false')
        show_save_pm_dialog()
    }else{
        pay_with_saved_pm()
    }
})

$(document).on('click', '.complete-profile-btn', function(){


    let fname = $("#complete-profile-fname").val();
    let lname = $("#complete-profile-lname").val();
    let email = $("#complete-profile-email").val();

    console.log('complete-profile-btn')

    console.log(fname)
    console.log(lname)
    console.log(email)

    if (fname == "") {
        alert("Please enter your first name!");
        return;
    }
    if (lname == "") {
        alert("Please enter your last name!");
        return;
    }
    if (email == "") {
        alert("Please enter your email address!");
        return;
    }

    if (validateEmail(email)) {

        $('.complete-profile-btn').prop('disabled', true)

        $.get(`${SERVER_URL}//sparco.io/account.php`, {
            task: 'sign_up',
            first_name: fname,
            last_name: lname,
            email: email,
            phone: localStorage.getItem("sparco_account_number"),
            pass_code: localStorage.getItem("sparco_account_activation_code")
        }).done(function (res) {

            $('#complete-profile-page').css({'display':'none'})
            $('#code-input-page').css({'display':'none'})

            $('.complete-profile-btn').prop('disabled', false)

            $("#home-page").fadeIn();

            console.log('sign_up response');
            console.log(res);
            localStorage.setItem("profile_is_complete", true)
            localStorage.setItem("account_first_name", fname);
            localStorage.setItem("account_last_name", lname);
            localStorage.setItem("account_email", email);
            localStorage.setItem("jwt", res['token']);


            // $("#overlay").hide();
            setTimeout(function () {
                // if (service) {
                //     buy_service(service);
                // }

            }, 100);

        })


    } else {
        alert("Please check the format of your email address!");
        return;
    }
})

// Address Verification
$(document).on('click', '#addr-auth-btn', function(){

    let addr_auth_page = M.Modal.getInstance($('#addr-auth-page'));
    addr_auth_page.close(); 

    let save_payment_method = $('#savepm-input').val()

    pay_with_unsaved_pm(save_payment_method, is_addr_auth=true)

})


$(document).on('click', '#test-contact-picker-btn', function(){
    // alert('test')

    // http://phonegap-plugins.com/plugins/kolwit/com.kolwit.pickcontact
    window.plugins.PickContact.chooseContact(function (contactInfo) {
        setTimeout(function () { // use time-out to fix iOS alert problem
            alert(contactInfo.displayName + " " + contactInfo.emailAddress + " " + contactInfo.phoneNr );
        }, 0);
    });
})

// $(document).on('touchend','#get-contact-btn', function(){

$(document).on('click', '.dial-pad-topup-checkout-v2-btn', function(){

    if($('#dialpad-tab-name-input-wrapper').css('display') == 'none'){
        $('#dialpad-tab-name-input-wrapper').css('display', 'block')
        $('#dialpad-tab-topup-amount-input-wrapper').css({display: 'block'})
        $('.select-funding-source').css({display: 'block'})
        return
    }
    alert($('#dialpad-tab-name-input-wrapper').css('display'))
})


// $('.support-contact-btn').bind(click, function(e) {
// 	e.preventDefault()
// 	var link = $(e.currentTarget).attr('href');
// 	window.open(link, '_system', 'location=yes');
// })




function topUpCheckOut() {

    let top_up_num = $('#dialpad-tab-topup-num').val()
    let top_up_amount = $('#dialpad-tab-topup-amount').val()
    let pm_id = $('.select-funding-source').data('payment-method-id')

    if (!top_up_num) {
        alert('Phone number is required.')
        return;
    }

    if ($('#dialpad-tab-topup-amount-input-wrapper').css('display') == 'none') {
        // $('#dialpad-tab-name-input-wrapper').css('display', 'block')
        $('#dialpad-tab-topup-amount-input-wrapper').css({ display: 'block' })
        $('.select-funding-source').css({ display: 'block' })
        return
    }



    let service = null
    if (top_up_num.startsWith("096") || top_up_num.startsWith("076")) {
        service = 'mtn'
    }
    if (top_up_num.startsWith("097")) {
        service = 'airtel'
    }
    if (top_up_num.startsWith("095")) {
        service = 'zamtel'
    }
    if (!service) {
        alert('Network not supported')
        return;
    }
    if (!pm_id) {
        alert('Funding Source is required.')
        return;
    }


    if (!top_up_amount) {
        alert('Top Up amount is required.')
        return;
    }

    // TODO
    // !!!PROCESS SAVED PM
    let top_up_data = JSON.stringify({
        'pmid': pm_id,
        'topupnumber': top_up_num,
        'service': service,
        'topupamount': top_up_amount,
    })

    localStorage.setItem('top_up_data', top_up_data)

    if (pm_id == 'new') {
        console.log('pay_with_unsaved_pm')
        // pay_with_unsaved_pm(save_payment_method='false')
        show_save_pm_dialog()
    } else {
        pay_with_saved_pm()
    }
}


function getContact() {

    // let permissions = cordova.plugins.permissions;
    // permissions.checkPermission(permissions.READ_CONTACTS, function( status ){
    // 	if ( status.checkPermission ) {
    // 		// console.log('Permission Given')

    // 	}
    // 	else {
    // 		permissions.requestPermission(permissions.READ_CONTACTS, function(status) {
    // 			// alert('success');


    // 		}, function() {
    // 			alert('Contacts Permission Not Given');
    // 			return;
    // 		});
    // 	}
    // });


    // alert('Test')
    // http://phonegap-plugins.com/plugins/kolwit/com.kolwit.pickcontact
    // window.plugins.PickContact.chooseContact(function (contactInfo) {
    // 	setTimeout(function () { // use time-out to fix iOS alert problem
    // 		alert(contactInfo.displayName + " " + contactInfo.emailAddress + " " + contactInfo.phoneNr );
    // 	}, 0);
    // });

    navigator.contacts.pickContact(function (contact) {
        let phoneNumber = contact.phoneNumbers[0].value.replace(/\s+/g, '').replace(/\-/g, '').replace('+260', '0')
        let topUpNetwork = null
        if (localStorage.getItem('service_type') == 'bill_payment') {
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
                $('#dialpad-tab-name').val(contact.displayName)
                $('#dialpad-tab-name-input-wrapper').css({ display: 'block' })
                $('#dialpad-tab-topup-num').val(phoneNumber)
                $('#dialpad-tab-topup-amount-input-wrapper').css({ display: 'block' })
                $('.select-funding-source').css({ display: 'block' })
            } else {
                console.log('Network Not Supported')
            }
        }

        if (localStorage.getItem('service_type') == 'money_transfer') {
            $('#dialpad-tab-name').val(contact.displayName)
            $('#dialpad-tab-name-input-wrapper').css({ display: 'block' })
            $('#dialpad-tab-transfer-num').val(phoneNumber)
            $('#dialpad-tab-transfer-amount-input-wrapper').css({ display: 'block' })
            $('.select-funding-source').css({ display: 'block' })
        }

        M.updateTextFields()
        // console.log('The following contact has been selected:' + JSON.stringify(contact));
        /*
        { "id": "1746", "rawId": "1721", "displayName": "Alex - MTN", "name": { "familyName": "MTN", "givenName": "Alex", "middleName": "-", "formatted": "Alex - MTN" }, "nickname": null, "phoneNumbers": [{ "id": "8226", "pref": false, "value": "+260 96 8220782", "type": "mobile" }], "emails": null, "addresses": null, "ims": null, "organizations": null, "birthday": null, "note": null, "photos": null, "categories": null, "urls": null }
        */
    }, function (err) {
        // console.log('Error: ' + err);
        // alert('Error: ' + err);
    })

}


function electricityCheckOut() {
    // alert('test');
    // return;


    let meter_num = $('#zesco-meter-number-input').val()
    let top_up_amount = $('#zesco-amount-input').val()
    let pm_id = $('.select-funding-source').data('payment-method-id')

    let service = 'zesco'

    if (!pm_id) {
        alert('Funding Source is required.')
        return;
    }
    if (!meter_num) {
        alert('Meter number is required.')
        return;
    }

    if (!top_up_amount) {
        alert('Top Up amount is required.')
        return;
    }
    // !!!PROCESS SAVED PM
    let top_up_data = JSON.stringify({
        'pmid': pm_id,
        'topupnumber': meter_num,
        'service': service,
        'topupamount': top_up_amount,
    })

    localStorage.setItem('top_up_data', top_up_data)

    if (pm_id == 'new') {
        console.log('zesco pay_with_unsaved_pm')
        // pay_with_unsaved_pm(save_payment_method='false')
        show_save_pm_dialog()
    } else {
        pay_with_saved_pm()
    }
}

function onConfirmSavePM(button) {
    let service_type = localStorage.getItem('service_type');
    if (button == 1) {
        // console.log('saving pm')
        if (service_type == 'bill_payment') {
            pay_with_unsaved_pm(save_payment_method = 'true')
        }
        if (service_type == 'money_transfer') {
            transfer_with_unsaved_pm(save_payment_method = 'true')
        }

    } else {
        // pay_with_unsaved_pm(save_payment_method='false')
        if (service_type == 'bill_payment') {
            pay_with_unsaved_pm(save_payment_method = 'false')
        }
        if (service_type == 'money_transfer') {
            transfer_with_unsaved_pm(save_payment_method = 'false')
        }
    }
}
function show_save_pm_dialog() {
    navigator.notification.confirm(
        'Would you like to save this payment method?',
        onConfirmSavePM,
        'Confirm',
        'Yes,No'
    );
}


$(document).on('click', '.support-contact-btn', function () {
    // e.preventDefault()
    let link = $(this).data('link');
    window.open(link, '_system', 'location=yes');
})


$(document).on('click', '.add-pm-btn', function () {
    let funding_source_modal = M.Modal.getInstance($('#funding-source-modal'));
    funding_source_modal.close();

    let pm_type_modal = M.Modal.getInstance($('#pm-type-modal'));
    pm_type_modal.open();
})

