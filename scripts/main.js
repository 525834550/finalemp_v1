$(document).ready(function(){
        if (window.standardEMPModelling == undefined) {
            var standardEMPModelling = {};
        }




        // function makeAllSortable(parent) {
        //     parent = parent || document.body;
        //     var t = parent.getElementsByTagName('table'), i = t.length;
        //     while (--i >= 0) makeSortable(t[i]);
        // }
        // function makeSortable(table) {
        //     var th = table.tHead, i;
        //     th && (th = th.rows[0]) && (th = th.cells);
        //     if (th) i = th.length;
        //     else return; // if no `<thead>` then do nothing
        //     while (--i >= 0) (function (i) {
        //         var dir = 1;
        //         th[i].addEventListener('click', function () {sortTable(table, i, (dir = 1 - dir))});
        //     }(i));
        // }


        // function sortTable(table, col, reverse) {
        //     var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
        //         tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
        //         i;
        //     reverse = -((+reverse) || -1);
        //     tr = tr.sort(function (a, b) { // sort rows
        //         return reverse // `-1 *` if want opposite order
        //             * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
        //                 .localeCompare(b.cells[col].textContent.trim())
        //                );
        //     });
        //     for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
        // }



        // (function () {
        //     //body
        //     makeAllSortable();
        // })();

        standardEMPModelling = {
            init: function() {
                standardEMPModelling.CreateEMPTableFromJSON();
                $("#saveEmpModel").on("click",this.updateEMPList); 
                $(".createempBtn button").on("click",this.showEmpModel);                
                $(document).on('click','.existingempList #view', this.slideout);
                $("#view__slidein").on("click",this.slidein);                
                $(".existingempList").on("click", "#edit", this.editReviewMode);
                $(".existingempList").on("click", "#del", this.deleterow);
                $(".createempBtn .btn").on("click",this.AddEmpmodel);


                // var FName = $(".FirstName_new").val();
                //  var LName = $(".LastName_new").val();             
                //  var Email = $(".Email_new").val();
                //  var Phone = $(".Phone_new").val();
                //  if( (FName == "") && (LName == "") && (Email =="") && (Phone=="")){                      
                //        $('#saveEmpModel').attr("disabled", "disabled");
                //     } else {
                //         $('#saveEmpModel').removeAttr('disabled');
                // }
              
            }, 
            AddEmpmodel:function(){
                         standardEMPModelling.clearvalues();
            },                   
            showEmpModel:function(){
                    $(".empReview").addClass("showempReview");
            },
            CreateEMPTableFromJSON:function(){
                var myEmp = [
                    {
                        "First Name": "John",
                        "Last Name": "Doe",
                        "Gender": "Male",
                        "Email" : "John.doe@xyz.com",
                        "Phone":"0123456789",
                        "state":"Active",
                        "Actions":""


                    },
                    {
                        "First Name": "William",
                        "Last Name": "Donsre",
                        "Gender": "Male",
                        "Email" : "William.donsre@xyz.com",
                        "Phone":"0734875345",
                        "state":"Active",
                        "Actions":""
                    },
                    {
                        "First Name": "Micheal",
                        "Last Name": "Patric",
                        "Gender": "Male",
                        "Email" : "Micheal.Patric@xyz.com",
                        "Phone":"5564634646",
                        "state":"Active",
                        "Actions":""
                    }
                ]

                // EXTRACT VALUE FOR HTML HEADER. 
                // ('Emp ID', 'Emp Name', 'Category' and 'Price')
                var col = [];
                for (var i = 0; i < myEmp.length; i++) {
                    for (var key in myEmp[i]) {
                        if (col.indexOf(key) === -1) {
                            col.push(key);  

                        }
                    }
                }

                // // CREATE DYNAMIC TABLE.
                var table = document.createElement("table");
                table.classList.add("existingempList", "table");

                // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
                var header = table.createTHead();
                var tr = header.insertRow(-1);                   // TABLE ROW.

                for (var i = 0; i < col.length; i++) {
                    var th = document.createElement("th");      // TABLE HEADER.
                    th.innerHTML = col[i];
                    // console.log(col[i]);
                    tr.appendChild(th);
                }
                var tbody = table.createTBody();        

                // ADD JSON DATA TO THE TABLE AS ROWS.

                for (var i = 0; i < myEmp.length; i++) {
               var tr = tbody.insertRow(-1); 
                   
                    for (var j = 0; j < col.length; j++) {
                        var tabCell = tr.insertCell(-1);
                        if(j==6) {                            
                            myEmp[i].Actions = '<div id="view">' + "View" + '</div>' +
                                                " " +
                                                '<div id="edit">' + "Edit" + '</div>' +
                                                " " +
                                                '<div id="del">' + "Delete" + '</div>';
                            tabCell.innerHTML = myEmp[i].Actions;
                         }else{
                            tabCell.innerHTML = myEmp[i][col[j]];
                         }
                    }
                }
                // standardEMPModelling.actionslink();
                // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
                var divContainer = document.getElementById("showData");
                divContainer.innerHTML = "";
                divContainer.appendChild(table);

                // $("tr:not(:first-child) td:last-child").addClass("glyphicon  glyphicon-pencil");    
               
            },
            actionslink:function(){
                var _list = $(".existingempList.table");
                 var _row = $("tbody tr:first", _list).clone();
                // _row.find("td:eq(6)").append('<a href="" data-target="#view_slide" id="view" data-toggle="popover">View</a>');
                //  _row.find("td:eq(6)").append('<a href="" id="edit" data-toggle="popover">Edit</a>');
                //  _row.find("td:eq(6)").append('<a href="" id="del" data-toggle="popover">Delete</a>');
            },
            updateEMPList:function(){
                $(".empReview").removeClass("showempReview");
                var counter;
                var _list = $(".existingempList.table");

                var FName = $(".FirstName_new").val();
                var LName = $(".LastName_new").val();             
                var Email = $(".Email_new").val();
                var Phone = $(".Phone_new").val();
                var Gend = $('input[name=gender]:checked', '#Employee_new').val();
                var State = $('input[name=State]:checked', '#Employee_new').val();
               

                var _row = $("tbody tr:first", _list).clone();
                 _row.find("td:first").text(FName);
                _row.find("td:eq(1)").text(LName);
                 _row.find("td:eq(2)").text(Gend);
                _row.find("td:eq(3)").text(Email);
                _row.find("td:eq(4)").text(Phone);
                 _row.find("td:eq(5)").text(State);

                $("tbody", _list).prepend(_row);

                    if(State=="Inactive"){
                        _row.addClass("inactive");
                    }else{
                        _row.removeClass("inactive");
                        _row.addClass("active");
                         setTimeout(function(){_row.removeClass("active"); }, 5000);
                    }
                
                standardEMPModelling.clearvalues();
                  counter++;
            },
            
            clearvalues: function() {                             
                $("#Employee_new input[type=text],#Employee_new textarea").val("");                             
                $('input[name="gender"]').prop('checked', false);
                $('input[name="State"]').prop('checked', false);                
                $(".empReview").removeClass("showempReview");
            },
            slideout:function(event){
                $("#viewslideout").animate({right: "0px" }, {queue: false, duration: 500});
                $(this).addClass("popped");
            },
            slidein:function(){
                $("#view__slidein").parent().animate({right:'-280px'}, {queue: false, duration: 500});
                $("#view").removeClass("popped"); 
            },
            editReviewMode:function(event){
                event.preventDefault();
                var _loadPreview = $(".empReview_model");                 
                $("#editnewemp").modal().find('.modal-body').append(_loadPreview);
                var Fname_edit= $(this).closest( "tr" ).find("td:first").text();
                $("#editnewemp .empReview_model .FirstName_new").val(Fname_edit);
                var Lname_edit= $(this).closest( "tr" ).find("td:eq(1)").text();
                $("#editnewemp .empReview_model .LastName_new").val(Lname_edit);
                var Email_edit= $(this).closest( "tr" ).find("td:eq(2)").text();
                $("#editnewemp .empReview_model .Email_new").val(Email_edit);
                var Phone_edit= $(this).closest( "tr" ).find("td:eq(3)").text();
                $("#editnewemp .empReview_model .Phone_new").val(Phone_edit);

                
                $("#editnewemp__saveEmpModel, #editnewemp__cancelEmpModel").on("click", function() {
                    var _loadPreview = $(".empReview_model");
                    $("#createnewemp").find('.modal-body').append(_loadPreview);                                       
                    $("#editnewemp").modal('hide');

                });
            },
            deleterow:function(event){
                  $(this).closest( "tr" ).css("display","none");
            }

        }

        standardEMPModelling.init();

   


});


