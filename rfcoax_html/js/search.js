  /*
   * This class is only used for Reverse Engineering When USER searchs for Particular serial numbers.
   * @param {string} username ; holds the username posted from the form.
   * @param {string} password ; hold the password posted from the form.
   */


class Search {

    SearchReverSe(){

      serial_number    =   $('#search').val();
      form_attribute   =   $('#search_form').val();
        /*
        * POSTING DATA ONTO THE FORM
        */

        $.ajax({
          type          : "POST",
          url           : url+'search_api.php',
          contentType   : "application/x-www-form-urlencoded;",
        //  dataType      : "json",
          data          : { "serial_number":serial_number, "action":form_attribute}
        }).done(function(response){
              //response = response.replace(/^\s*/,'').replace(/\s*$/,'');

              //if(response == 'fail'){
                  //("#search_result").html("Invalid access to the system.");
              //}else{
                $("#search_result").html(response);
              //}

        }).fail(function(jqXHR,textStatus){
          alert("Request failed");
        });
        //$("#show_msg").html('This is great');

      }

    LoadFormList(platformType){

        console.log(platformType);
        var id;

        var connectorsArray         = '';
        var cableArray              = '';
        var PhaseMatchArray         = '';
        var LengthMatchArray        = '';
        var DataMatchArray          = '';

        if(platformType==0){
            var checked                 = 'checked';
            var checked2                = '';
            var checked1                = '';
        }else if(platformType==1){
            var checked1                = 'checked';
            var checked2                = '';
            var checked                 = '';
        }else{
            var checked2                = 'checked';
            var checked                 = '';
            var checked1                = '';
        }




        $.ajax({
            type          : "POST",
            url           : url+'load_json.php',
            contentType   : "application/x-www-form-urlencoded;",
            dataType: "json",
            async: false,
            data          : { "platformType":platformType}
        }).done(function(response){

           // $("#search_result").html('<div class="control-group"><label title="CHOOSE: 086 platform (up to 65 GHz), 047 platform (up to 110 GHz), or 141 platform (up to 27 GHz)">Diameter: </label><div class="radio">' +
            var form_param = '';
            form_param = ('<div class="page-header"><h4>DESIGN YOUR CABLE</h4></div>');

            form_param = form_param+('<form id="form"><div class="form-group"><label for="diameter_cable">Diameter</label></div><div class="form-group"><div class="btn-group" data-toggle="buttons"><label class="btn btn-default btn-md"><input type="radio" '+ checked +' name="diameter_cable" id="diameter_cable" required="" diameter_uuid_val="0" value="0" onclick="SearchAPI.LoadFormList(0);">086</label><label class="btn btn-default btn-md"><input type="radio" '+ checked1 +' diameter_uuid_val="1" name="diameter_cable" id="diameter_cable" required="" value="1" onclick="SearchAPI.LoadFormList(1)";>047</label><label class="btn btn-default btn-md"><input type="radio" '+ checked2 +' diameter_uuid_val="2" name="diameter_cable" id="diameter_cable" required="" value="2" onclick="SearchAPI.LoadFormList(2)";>141</label></div></div>');

            $.each(response["connectorList"], function(ind, connectorList) {
              //console.log(connectorList);
                connectorsArray = connectorsArray+"<option value='"+(connectorList.id)+"'>"+(connectorList.connector_name)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="connector_1">Connector 1  <small>*</small></label><select name="connector_1" class="form-control" id="connector_1">' + connectorsArray + '</select></div>');
            form_param = form_param+('<div class="form-group"><label for="connector_2">Connector 2  <small>*</small></label><select name="connector_2" class="form-control" id="connector_2">' + connectorsArray + '</select></div>');


            $.each(response["cableList"], function(ind, cableList) {
                //console.log(connectorList);
                cableArray = cableArray+"<option value='"+(cableList.id)+"'>"+(cableList.cable_name)+"</option>";
            });


            form_param = form_param+('<div class="form-group"><label for="cable_name">Cable Type  <small>*</small></label><select name="cable_name" class="form-control" id="cable_name">' + cableArray + '</select></div>');
            form_param = form_param+('<div class="form-group"><label for="Length">Length  <small>*</small></label><input title="The Length should be more then 2inches OR 5cm" type="text" name="length_dia" id="length_dia" class="form-control" value="12"></div>');

            $.each(response["lengthList"], function(ind, lengthList) {
                //console.log(connectorList);
                LengthMatchArray = LengthMatchArray+"<option value='"+(lengthList.id)+"'>"+(lengthList.length_title)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="phase_mat">Unit Of Measure <small>*</small></label><select name="phase_mat" class="form-control" id="phase_mat">' + LengthMatchArray + '</select></div>');


            $.each(response["phaseMatchList"], function(ind, phaseMatchList) {
                //console.log(connectorList);
                PhaseMatchArray = PhaseMatchArray+"<option value='"+(phaseMatchList.id)+"'>"+(phaseMatchList.phase_type)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="phase_mat">Phase Matching  <small>*</small></label><select name="phase_mat" class="form-control" id="phase_mat">' + PhaseMatchArray + '</select></div>');

            $.each(response["testData"], function(ind, testData) {
                //console.log(connectorList);
                DataMatchArray = DataMatchArray+"<option value='"+(testData.id)+"'>"+(testData.test_data_title)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="test_data_val">Test Data  <small>*</small></label><select name="test_data_val" class="form-control" id="test_data_val">' + DataMatchArray + '</select></div>');
            form_param = form_param+('<div class="form-group"><input type="button" onclick="SearchAPI.FormGenerator();" name="submit_frm" id="submit_frm" value="Submit" class="btn btn-success" />&nbsp;<input type="submit" name="res" id="res" value="Clear" class="btn btn-default" /></div></form>')

            $("#search_result").html(form_param);



        }).fail(function(jqXHR,textStatus){
            alert("Request failed");
        });
    }

    FormGenerator(){
        var id;

        var connectorsArray         = '';
        var cableArray              = '';
        var PhaseMatchArray         = '';
        var LengthMatchArray        = '';
        var DataMatchArray          = '';

        /**
         * data {string}; contains all the elements from the form.
         */
        var data = $('#form').serialize().split("&");
        var diameter_cable = $("#submit_frm").attr('diameter_uuid_val');

        //console.log(data);

        //console.log(diameter_cable);

        /**
         * Converting the serialized data into JSON string.
         */

        var obj={};
        for(var key in data)
        {
            obj[data[key].split("=")[0]] = data[key].split("=")[1];
        }


        var cable_name  = obj.cable_name;
        var connector_1 = obj.connector_1;
        var connector_2 = obj.connector_2;
        var diameter_cable = obj.diameter_cable;
        var length_dia = obj.length_dia;
        var phase_mat = obj.phase_mat;
        var test_data_val = obj.test_data_val;

        if(diameter_cable==0){
            var checked                 = 'checked';
            var checked2                = '';
            var checked1                = '';
        }else if(diameter_cable==1){
            var checked1                = 'checked';
            var checked2                = '';
            var checked                 = '';
        }else{
            var checked2                = 'checked';
            var checked                 = '';
            var checked1                = '';
        }



        $.ajax({
            type          : "POST",
            url           : url+'load_json.php',
            contentType   : "application/x-www-form-urlencoded;",
            dataType: "json",
            async: false,
            data          : { "platformType":diameter_cable}
        }).done(function(response){

            // $("#search_result").html('<div class="control-group"><label title="CHOOSE: 086 platform (up to 65 GHz), 047 platform (up to 110 GHz), or 141 platform (up to 27 GHz)">Diameter: </label><div class="radio">' +
            var form_param = '';
            form_param = ('<div class="page-header"><h4>DESIGN YOUR CABLE</h4></div>');

            form_param = form_param+('<form id="form"><div class="form-group"><label for="diameter_cable">Diameter</label></div><div class="form-group"><div class="btn-group" data-toggle="buttons"><label class="btn btn-default btn-md"><input type="radio" '+ checked +' name="diameter_cable" id="diameter_cable" required="" diameter_uuid_val="0" value="0" onclick="SearchAPI.LoadFormList(0);">086</label><label class="btn btn-default btn-md"><input type="radio" '+ checked1 +' diameter_uuid_val="1" name="diameter_cable" id="diameter_cable" required="" value="1" onclick="SearchAPI.LoadFormList(1)";>047</label><label class="btn btn-default btn-md"><input type="radio" '+ checked2 +' diameter_uuid_val="2" name="diameter_cable" id="diameter_cable" required="" value="2" onclick="SearchAPI.LoadFormList(2)";>141</label></div></div>');

            $.each(response["connectorList"], function(ind, connectorList) {
                //console.log(connectorList);
                connectorsArray = connectorsArray+"<option value='"+(connectorList.id)+"' "+(connectorList.id==connector_1)?' selected':''+">"+(connectorList.connector_name)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="connector_1">Connector 1  <small>*</small></label><select name="connector_1" class="form-control" id="connector_1">' + connectorsArray + '</select></div>');
            form_param = form_param+('<div class="form-group"><label for="connector_2">Connector 2  <small>*</small></label><select name="connector_2" class="form-control" id="connector_2">' + connectorsArray + '</select></div>');


            $.each(response["cableList"], function(ind, cableList) {
                //console.log(connectorList);
                cableArray = cableArray+"<option value='"+(cableList.id)+"'>"+(cableList.cable_name)+"</option>";
            });


            form_param = form_param+('<div class="form-group"><label for="cable_name">Cable Type  <small>*</small></label><select name="cable_name" class="form-control" id="cable_name">' + cableArray + '</select></div>');
            form_param = form_param+('<div class="form-group"><label for="Length">Length  <small>*</small></label><input title="The Length should be more then 2inches OR 5cm" type="text" name="length_dia" id="length_dia" class="form-control" value="12"></div>');

            $.each(response["lengthList"], function(ind, lengthList) {
                //console.log(connectorList);
                LengthMatchArray = LengthMatchArray+"<option value='"+(lengthList.id)+"'>"+(lengthList.length_title)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="phase_mat">Unit Of Measure <small>*</small></label><select name="phase_mat" class="form-control" id="phase_mat">' + LengthMatchArray + '</select></div>');


            $.each(response["phaseMatchList"], function(ind, phaseMatchList) {
                //console.log(connectorList);
                PhaseMatchArray = PhaseMatchArray+"<option value='"+(phaseMatchList.id)+"'>"+(phaseMatchList.phase_type)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="phase_mat">Phase Matching  <small>*</small></label><select name="phase_mat" class="form-control" id="phase_mat">' + PhaseMatchArray + '</select></div>');

            $.each(response["testData"], function(ind, testData) {
                //console.log(connectorList);
                DataMatchArray = DataMatchArray+"<option value='"+(testData.id)+"'>"+(testData.test_data_title)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="test_data_val">Test Data  <small>*</small></label><select name="test_data_val" class="form-control" id="test_data_val">' + DataMatchArray + '</select></div>');
            form_param = form_param+('<div class="form-group"><input type="button" onclick="SearchAPI.FormGenerator();" name="submit_frm" id="submit_frm" value="Submit" class="btn btn-success" />&nbsp;<input type="submit" name="res" id="res" value="Clear" class="btn btn-default" /></div></form>')

            $("#search_result").html(form_param);



        }).fail(function(jqXHR,textStatus){
            alert("Request failed");
        });

    }

  }
