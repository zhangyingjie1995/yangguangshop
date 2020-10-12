require(['config'], function() {
    require(['jquery', 'jq_lazyload'], function() {;
        ! function($) { //数据渲染模块
            const list = $('.list ul');
            $.ajax({
                url: 'http://192.168.11.2/JS2008/yangguanggouwu_test/php/piclist.php',
                dataType: 'json'
            }).done(function(data) {
                // console.log(data);
                let strhtml = '';
                $.each(data, function(index, value) {
                    strhtml += `
                <a href="detail.html?sid=${value.sid}">
                    <li>
                        <img class="lazy" data-original="${value.url}" width="200" height="200" >
                        <p>${value.title}</p>
                        <span>${value.price}</span>
                        <span>${value.sailnumber}</span>
                    </li>
                </a>
                `;
                });
                list.html(strhtml);
                //实现懒加载效果
                $("img.lazy").lazyload({
                    effect: "fadeIn"
                });
            })

        }(jQuery);


    })
})