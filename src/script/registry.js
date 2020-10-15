require(['config'], function() {
    require(['jquery'], function() {
        console.log(123);
        ! function($) {
            var userflag = true;
            var telflag = true;
            var passflag = true;
            //用户名
            $('.name').on('focus', function() {
                $('em').eq(0).html('设置后不可更改，中英文均可，最长14个英文或7个汉字')
                    .css('color', 'red')
            }).on('blur', function() {
                let name = $('.name').val()
                if (name !== '') {
                    len = this.value.replace(/[\u4e00-\u9fa5]/g, '**').length;
                    let reg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
                    if (len >= 6 && len <= 14) {
                        if (reg.test(this.value)) {
                            $('em').eq(0).html('√').css('color', 'green')
                            userflag = true
                        } else {
                            $('em').html('用户名格式输入有误').css('color', 'red')
                            userflag = false
                        }
                    } else {
                        $('em').eq(0).html('请输入最长14个英文或7个汉字').css('color', 'red')
                        userflag = false
                    }

                } else {
                    $('em').eq(0).html('用户名不能为空').css('color', 'red')
                    userflag = false
                }
            })

            // 手机号码
            $('.tell').on('focus', function() {
                $('em').eq(1).html('请输入手机号码').css('color', 'red')
            }).on('blur', function() {
                let tell = $('.tell').val()
                if (tell !== '') {
                    let reg = /^1[3578]\d{9}$/;
                    if (reg.test(this.value)) {
                        $('em').eq(1).html('√').css('color', 'green')
                        telflag = true;
                    } else {
                        $('em').eq(1).html('手机号格式错误')
                        telflag = false;
                    }
                } else {
                    $('em').eq(1).html('手机号码不能为空')
                    telflag = false;
                }
            })


            // 用户密码 
            $('.password').on('focus', function() {
                    $('em').eq(2).html('请输入密码,长度为8-14个字符').css('color', 'red')
                }).on('input', function() {
                    if (this.value.length >= 8 && this.value.length <= 14) {
                        var regnum = /\d+/g;
                        var reglower = /[a-z]+/g;
                        var regupper = /[A-Z]+/g;
                        var other = /[\W\_]+/g;
                        var count = 0;


                        if (regnum.test(this.value)) {
                            count++;
                        }

                        if (reglower.test(this.value)) {
                            count++;
                        }

                        if (regupper.test(this.value)) {
                            count++;
                        }

                        if (other.test(this.value)) {
                            count++;
                        }
                        switch (count) {
                            case 1:
                                $('em').eq(2).html('弱').css('color', 'red')
                                passflag = false
                                break;
                            case 2:
                            case 3:
                                $('em').eq(2).html('中').css('color', 'orange')
                                passflag = true
                                break
                            case 4:
                                $('em').eq(2).html('强').css('color', 'green')
                                passflag = true
                        }
                    } else {
                        $('em').eq(2).html('请输入为8-14个字符')
                        passflag = false
                    }
                }).on('blur', function() {
                    let password = $('.password').val()
                    if (password !== '') {
                        if (passflag) {
                            $('em').eq(2).html('√').css('color', 'green')
                            passflag = true
                        }

                    } else {
                        $('em').eq(2).html('密码不能为空')
                        passflag = false

                    }
                })
                // 确认密码
            $('.password_ok').on('focus', function() {
                $('em').eq(3).html('请再次输入密码').css('color', 'red')
            }).on('blur', function() {
                let password_ok = $('.password_ok').val()
                if (password_ok !== '') {
                    if (password_ok == $('.password').val()) {
                        $('em').eq(3).html('√').css('color', 'green')
                    } else {
                        $('em').eq(3).html('两次密码不一致').css('color', 'red')
                        passflag = false;
                    }
                } else {
                    $('em').eq(3).html('密码不能为空')
                    passflag = false;
                }
            });
            $('.registry').on('submit', function() {
                if ($('.name').val() == '') {
                    $('em').eq(0).html('用户名不能为空').css('color', 'red')
                    userflag = false;
                }
                if ($('.tell').val() == '') {
                    $('em').eq(1).html('手机号码不能为空').css('color', 'red')
                    telflag = false;
                }
                if ($('.password').val() == '') {
                    $('em').eq(2).html('密码不能为空').css('color', 'red')
                    passflag = false;
                }
                if ($('.password_ok').val() == '') {
                    $('em').eq(3).html('密码不能为空').css('color', 'red')
                    passflag = false;
                }
                if (!userflag || !telflag || !password) {
                    return false
                }
            })

        }(jQuery)
    })
})