require(['config'], function() {
    require(['jquery'], function() { //回到顶部
        ! function($) {
            $('.totop').on('click', function() {
                $('html').stop().animate({
                    scrollTop: 0
                })
            })
        }(jQuery)
        //搜索联想菜单
        ! function($) {
            $('.sousuo').blur(function() {
                $('#list').hide()
            }).focus(function() {
                $('#list').show()
                this.value = ''
            })
        }(jQuery)
    })
})