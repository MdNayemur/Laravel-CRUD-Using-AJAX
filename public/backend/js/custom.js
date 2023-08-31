

jQuery(document).ready(function(){


    // function for delete
    jQuery(document).on("click", ".deleteCategory", function () {
        
        var catid = jQuery(this).val();
       
        $.ajax({
            url: "catdelete/" + catid,
            type: "GET",
            dataType: "JSON",
            success: function (result) {
                if (result.status == "success") {
                    jQuery(".successMsg").html("");
                    jQuery(".successMsg").append(
                        "<span class='alert alert-success'>Category Deleted Successfully<span>"
                    );
    
                    jQuery(".successMsg").fadeIn(1000);
                    jQuery(".successMsg").fadeOut(1000);
                    showData();
                }
            }
        });


    });
    // function for delete ends



    // functions for edit
    jQuery(document).on('click', '.catEdit',function(e){
        e.preventDefault();

        var catId=jQuery(this).val();
        $.ajax({
            url:'catedit/'+catId,
            type:'GET',
            dataType:'json',
            success:function(result){
                jQuery("#name").val(result.data.name);
                jQuery("#des").val(result.data.des);
                jQuery("#tag").val(result.data.tag);
                jQuery("#deleteCategoryId").val(result.data.id);
                jQuery(".sts").val(result.data.status);
                if(result.data.status==1){
                    jQuery(".sts").text("Active");
                }
                else{
                    jQuery(".sts").text("Inactive");
                }
                
            }
        });
    });

    jQuery(".updateCategoryBtn").click(function () {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        var name=jQuery(".catname").val();
        var des=jQuery(".catdes").val();
        var tag=jQuery(".cattag").val();
        var status=jQuery(".catstatus").val();
        var catid =jQuery(".deleteCategoryId").val();

        $.ajax({
            url:'update/' +catid,
            type:'POST',
            dataType:'json',
            data:{
                'name':name,
                'des':des,
                'tag':tag,
                'status':status
            },
            success: function(result){
                if(result.success == 'faild'){
                    jQuery(".nameError").text(result.errors.name);
                    jQuery(".desError").text(result.errors.des);
                    jQuery(".tagError").text(result.errors.tag);

                }
                else{
                    showData();
                    jQuery(".msg").append('<div class="alert alert-success">'+result.msg+'</div>');
                    jQuery("#editCategory").modal('hide');
                    jQuery("#editCategory").find('input').val('');
                    jQuery("#editCategory").find('textarea').val('');
                    jQuery(".msg").fadeOut(5000);
                    
                }
            }
        });
    });
    // function for edit ends


    //function for show data 
    showData();
    function showData(){
        $.ajax({
            url:'catshow',
            type:'GET',
            datatype:'json',
            success:function(result){
                var sl=1;
                jQuery(".tbody").html('');
                $.each(result.data, function(key, item){
                    jQuery(".tbody").append('<tr>\
                    <td>'+sl+'</td>\
                    <td>'+item.name+'</td>\
                    <td>'+item.des+'</td>\
                    <td>'+item.tag+'</td>\
                    <td>'+item.status+'</td>\
                    <td>\
                      <button data-target="#editCategory" data-toggle="modal" class="btn btn-sm btn-info catEdit" value="'+item.id+'" ><i class="fa fa-edit"></i></button>\
                      <button class="deleteCategory"  value="'+item.id+'" >Delete</button>\
                    </td>\
                  </tr>');
                  sl++;
                });
            }
        });
    }
    // function for show data ends



    // function for add data 
    jQuery(".addCategory").click(function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        var name=jQuery(".name").val();
        var des=jQuery(".des").val();
        var tag=jQuery(".tag").val();
        var status=jQuery(".status").val();

        $.ajax({
            url:'catinsert',
            type:'POST',
            dataType:'json',
            data:{
                'name':name,
                'des':des,
                'tag':tag,
                'status':status
            },
            success: function(result){
                if(result.success == 'faild'){
                    jQuery(".nameError").text(result.errors.name);
                    jQuery(".desError").text(result.errors.des);
                    jQuery(".tagError").text(result.errors.tag);

                }
                else{
                    showData();
                    jQuery(".msg").append('<div class="alert alert-success">'+result.msg+'</div>');
                    jQuery("#addCategory").modal('hide');
                    jQuery("#addCategory").find('input').val('');
                    jQuery("#addCategory").find('textarea').val('');
                    jQuery(".msg").fadeOut(5000);
                    
                }
            }
        });
    });

});