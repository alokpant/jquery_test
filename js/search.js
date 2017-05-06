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
        var JacketArray             = '';

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
            form_param = form_param+('<div class="form-group"><label for="lengthList">Unit Of Measure <small>*</small></label><select name="lengthList" class="form-control" id="lengthList">' + LengthMatchArray + '</select></div>');


            $.each(response["phaseMatchList"], function(ind, phaseMatchList) {
                //console.log(connectorList);
                PhaseMatchArray = PhaseMatchArray+"<option value='"+(phaseMatchList.id)+"'>"+(phaseMatchList.phase_type)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="phase_mat">Phase Matching  <small>*</small></label><select name="phase_mat" class="form-control" id="phase_mat">' + PhaseMatchArray + '</select></div>');


            $.each(response["jacketList"], function(ind, jacketList) {
                //console.log(connectorList);
                JacketArray = JacketArray+"<option value='"+(jacketList.id)+"'>"+(jacketList.jacket_type)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="jacket_type">Jacket <small>*</small></label><select name="jacket_type" class="form-control" id="jacket_type">' + JacketArray + '</select></div>');

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

        var connector2Check         = '';
        var connector1Check         = '';
        var cableCheck              = '';
        var lengthCheck             = '';
        var phaseCheck              = '';
        var testCheck               = '';
        var jacketCheck             = '';

        var connectorsArray1        = '';
        var connectorsArray2        = '';
        var cableArray              = '';
        var PhaseMatchArray         = '';
        var LengthMatchArray        = '';
        var DataMatchArray          = '';
        var JacketArray             = '';

        /**
         * data {string}; contains all the elements from the form.
         */
        var data = $('#form').serialize().split("&");
        var diameter_cable = $("#submit_frm").attr('diameter_uuid_val');

        console.log(data);

        //console.log(diameter_cable);

        /**
         * Converting the serialized data into JSON string.
         */

        var obj={};
        for(var key in data)
        {
            obj[data[key].split("=")[0]] = data[key].split("=")[1];
        }


        console.log(obj);

        var cable_name          = obj.cable_name;
        var connector_1         = obj.connector_1;
        var connector_2         = obj.connector_2;
        var diameter_cable      = obj.diameter_cable;
        var length_dia          = obj.length_dia;
        var phase_mat           = obj.phase_mat;
        var lengthList          = obj.lengthList;
        var test_data_val       = obj.test_data_val;
        var jacket_type        = obj.jacket_type;

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


        /**
         * this ajax call will fetch all the details of the elements posted from the form
         */

        $.ajax({
            type          : "POST",
            url           : url+'loadDescription.php',
            contentType   : "application/x-www-form-urlencoded;",
            dataType: "json",
            async: false,
            data          : { "diameter_cable":diameter_cable,
                                "cable_name":cable_name,
                                'connector_1':connector_1,
                                'connector_2':connector_2,
                                'diameter_cable':diameter_cable,
                                'length_dia':length_dia,
                                'phase_mat':phase_mat,
                                'lengthList':lengthList,
                                'jacket_type':jacket_type,
                                'test_data_val':test_data_val}
        }).done(function(response){
                //console.log(response);
            var technical_spec      = '';
            var PlatForm            = '';
            var Connector1          = '';
            var Connector2          = '';
            var CableSegB           = '';
            var CableSegC           = '';
            var Conn1SegB           = '';
            var Conn2SegB           = '';
            var JacketSegA          = '';
            var LengthABet          = '';
            var LengthSecC          = '';
            var PhaseSegA           = '';
            var TestSegA            = '';
            var DescSegA1           = '';
            var DescSegB1           = '';
            var DescFreq1           = '';

            var DescSegA2           = '';
            var DescSegB2           = '';
            var DescFreq2           = '';

            var CableDescA          = '';
            var CableDescB          = '';
            var CableDescC          = '';

            var LengthDescB         = '';
            var LengthDescA         = '';

            var DescRotation        = '';
            var JacketDescA         = '';
            var TestDescA           = '';
            var PhaseDescA          = '';

            var ConnDescB1Commas    = '';

            var PriceCap            = '';

            switch(diameter_cable){
                case '0':
                    PlatForm = '086';
                    break;
                case '1':
                    PlatForm = '047';
                    break;
                case '2':
                    PlatForm = '141';
                    break;
            }


            //
            technical_spec = ('<div class="page-header"><h4>TECHNICAL SPECS</h4></div>');

            $.each(response["connector_1"], function(ind, connectorDet1) {
                Connector1  = connectorDet1['pn_seg_a'];
                Conn1SegB   = connectorDet1['pn_seg_b'];
                DescSegA1   = connectorDet1['desc_seg_a'];
                DescSegB1   = connectorDet1['desc_seg_b'];
                DescFreq1   = connectorDet1['frequency_range'];
            });
            $.each(response["connector_2"], function(ind, connectorDet2) {
                Connector2  = connectorDet2['pn_seg_a'];
                Conn2SegB   = connectorDet2['pn_seg_b'];
                DescSegA2   = connectorDet2['desc_seg_a'];
                DescSegB2   = connectorDet2['desc_seg_b'];
                DescFreq2   = connectorDet2['frequency_range'];
            });
            $.each(response["cableList"], function(ind, CableDet) {
                CableSegB   = CableDet['pn_seg_b'];
                CableSegC   = CableDet['pn_seg_c'];
                CableDescA  = CableDet['desc_seg_a'];
                CableDescB  = CableDet['desc_seg_b'];
                CableDescC  = CableDet['desc_seg_c'];
            });
            $.each(response["jacketList"], function(ind, JacketDet) {
                JacketSegA   = JacketDet['pn_seg_a'];
                JacketDescA   = JacketDet['desc_seg_a'];
            });

            $.each(response["lengthList"], function(ind, LengthDet) {
                LengthABet   = LengthDet['pn_seg_a'];
                LengthSecC   = LengthDet['pn_seg_c'];
                LengthDescB  = LengthDet['desc_seg_b'];
            });

            $.each(response["phaseMatchList"], function(ind, PhaseMatchDet) {
                PhaseSegA   = PhaseMatchDet['pn_seg_a'];
                PhaseDescA  = PhaseMatchDet['desc_seg_a'];
            });

            $.each(response["testData"], function(ind, TestDataDet) {
                TestSegA   = TestDataDet['pn_seg_a'];
                TestDescA   = TestDataDet['desc_seg_a'];
            });

            $.each(response["discountList"], function(ind, DiscountDet) {
                PriceCap = PriceCap+', '+DiscountDet['range_discount']+' $'+DiscountDet['discount_percentage'];
            });

            var PartNumber = '';

            var Description = '';

            if (DescFreq1 > DescFreq2){
                ConnDescB1Commas = DescSegB2;
            } else {
                ConnDescB1Commas = DescSegB1;
            }



            PartNumber = Connector1+Connector2+PlatForm+Conn1SegB+Conn2SegB+CableSegB+JacketSegA+LengthABet+length_dia+PhaseSegA+CableSegC+TestSegA;


            Description = 'RF Cable Assembly, '+DescSegA1+' to '+DescSegA2+DescRotation+' ,'
                + ' '+CableDescA+' '+CableDescB+' ,'+ConnDescB1Commas+' ,' +
                ''+JacketDescA+', '+PhaseDescA+', '+length_dia+' '+LengthDescB+' , '+CableDescC+' '+TestDescA;



            //$description_generator = "RF Cable Assembly, " .
            // $connector_des_a_1 . " to " . $connector_des_a_2 .
            // $description_rotation . $cabletype_des_a . " " .
            // $cabletype_des_b . $connector_des_b_1_commas .
            // $jacket_des_a . $phase_mat_des_a . " " .
            // $_SESSION['config']['length_dia'] .
            // $des_length . " " . $length_des_b .
            // $cabletype_des_c . $test_des_a;




            $('.nav a[href="#search_result_array"]').tab('show');
            technical_spec = technical_spec+'<div><strong>Part Number:</strong> '+PartNumber+'</div>';
            technical_spec = technical_spec+'<div><strong>Description:</strong> '+Description+'</div>';
            technical_spec = technical_spec+'<div><strong>Price:</strong> '+Description+'</div>';

            $("#search_result_array").html(technical_spec);

        });

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
                if(connectorList.id==connector_1){
                    connector1Check = "selected";
                }else{
                    connector1Check = "";
                }

                connectorsArray1 = connectorsArray1+"<option value='"+(connectorList.id)+"' "+connector1Check+">"+(connectorList.connector_name)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="connector_1">Connector 1  <small>*</small></label><select name="connector_1" class="form-control" id="connector_1">' + connectorsArray1 + '</select></div>');
            $.each(response["connectorList"], function(ind, connectorList) {
                if(connectorList.id==connector_2){
                    connector2Check = "selected";
                }else{
                    connector2Check = "";
                }
                connectorsArray2 = connectorsArray2+"<option value='"+(connectorList.id)+"' "+connector2Check+">"+(connectorList.connector_name)+"</option>";
            });

            form_param = form_param+('<div class="form-group"><label for="connector_2">Connector 2  <small>*</small></label><select name="connector_2" class="form-control" id="connector_2">' + connectorsArray2 + '</select></div>');


            $.each(response["cableList"], function(ind, cableList) {
                //console.log(connectorList);
                if(cableList.id==cable_name){
                    cableCheck = "selected";
                }else{
                    cableCheck = "";
                }
                cableArray = cableArray+"<option value='"+(cableList.id)+"' "+cableCheck+">"+(cableList.cable_name)+"</option>";
            });

            var diameter_cable = obj.diameter_cable;
            var length_dia = obj.length_dia;
            var phase_mat = obj.phase_mat;
            var test_data_val = obj.test_data_val;


            form_param = form_param+('<div class="form-group"><label for="cable_name">Cable Type  <small>*</small></label><select name="cable_name" class="form-control" id="cable_name">' + cableArray + '</select></div>');
            form_param = form_param+('<div class="form-group"><label for="Length">Length  <small>*</small></label><input title="The Length should be more then 2inches OR 5cm" type="text" name="length_dia" id="length_dia" class="form-control" value="12"></div>');

            $.each(response["lengthList"], function(ind, lengthList) {
                //console.log(connectorList);

                if(lengthList.id==lengthList){
                    lengthCheck = "selected";
                }else{
                    lengthCheck = "";
                }

                LengthMatchArray = LengthMatchArray+"<option value='"+(lengthList.id)+"' "+lengthCheck+">"+(lengthList.length_title)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="phase_mat">Unit Of Measure <small>*</small></label><select name="lengthList" class="form-control" id="lengthList">' + LengthMatchArray + '</select></div>');


            $.each(response["phaseMatchList"], function(ind, phaseMatchList) {
                //console.log(connectorList);
                if(phaseMatchList.id==phase_mat){
                    phaseCheck = "selected";
                }else{
                    phaseCheck = "";
                }

                PhaseMatchArray = PhaseMatchArray+"<option value='"+(phaseMatchList.id)+"' "+phaseCheck+">"+(phaseMatchList.phase_type)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="phase_mat">Phase Matching  <small>*</small></label><select name="phase_mat" class="form-control" id="phase_mat">' + PhaseMatchArray + '</select></div>');

            $.each(response["jacketList"], function(ind, jacketList) {

                if(jacketList.id==jacket_type){
                    jacketCheck = "selected";
                }else{
                    jacketCheck = "";
                }
                //console.log(connectorList);
                JacketArray = JacketArray+"<option value='"+(jacketList.id)+"' "+jacketCheck+">"+(jacketList.jacket_type)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="jacket_type">Jacket <small>*</small></label><select name="jacket_type" class="form-control" id="jacket_type">' + JacketArray + '</select></div>');


            $.each(response["testData"], function(ind, testData) {
                //console.log(connectorList);
                if(testData.id==test_data_val){
                    testCheck = "selected";
                }else{
                    testCheck = "";
                }

                DataMatchArray = DataMatchArray+"<option value='"+(testData.id)+"' "+testCheck+">"+(testData.test_data_title)+"</option>";
            });
            form_param = form_param+('<div class="form-group"><label for="test_data_val">Test Data  <small>*</small></label><select name="test_data_val" class="form-control" id="test_data_val">' + DataMatchArray + '</select></div>');
            form_param = form_param+('<div class="form-group"><input type="button" onclick="SearchAPI.FormGenerator();" name="submit_frm" id="submit_frm" value="Submit" class="btn btn-success" />&nbsp;<input type="submit" name="res" id="res" value="Clear" class="btn btn-default" /></div></form>')


            $("#search_result").html(form_param);



        }).fail(function(jqXHR,textStatus){
            alert("Request failed");
        });

    }

  }
