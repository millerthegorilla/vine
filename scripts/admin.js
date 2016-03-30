tinymce.init({
		  selector: 'div#page.text',
		  inline: true,
		  plugins: [
			'advlist autolink lists link image charmap print preview anchor',
			'searchreplace save fullscreen',
			'insertdatetime media table contextmenu paste'
		  ],
		  toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | save logout',
		  save_onsavecallback: function () {
				$.ajax({
						url:'/admin/save.php',
						method:'POST',
						data: { PATH : $.address.path(), TEXT : $('#page').html() },
						dataType: 'html',
						success:function(data) 
								{
									console.log(data);
									console.log('\n' + $('#page').html());
									//alert("Save successful :" + data + ' bytes written.');
									//document.location.reload(true);
								}	
						});
			},
			setup: function (editor) {
				  editor.addButton('logout', {
				  text: 'LogOut',
				  icon: false,
				  onclick: function () {
					$.ajax({
							url:'/admin/logout.php',
							method: 'GET',
							cache:false,
							success: function() 
							{
								alert('You have been logged out!');
								document.location.replace('http://test.local/pages/' + $.address.path());		
							}
						});
					}
				});
			},
});
