//列表页的js
require(['config'], function() {
    require(['jquery', 'jq_lazyload', 'jq_pagination'], function() {;
        ! function($) {
            //排序
            let array_default = [];
            let array = [];
            let prev = null;
            let next = null;
            const $list = $('.-list');
            $.ajax({
                url: 'http://192.168.11.2/JS2008/yangguanggouwu_test/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '<ul>';
                $.each(data, function(index, value) {
                    $strhtml += `
                                <li>
                                    <a href="detail.html?sid=${value.sid}" target="_blank">
                                        <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                                        <p>${value.sid}${value.title}</p>
                                        <span class="price">￥${value.price}</span>
                                        <span>${value.sailnumber}</span>
                                    </a>
                                </li>
                            `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);
                //添加懒加载
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });

                //将页面的li元素加载到两个数组中
                $('.-list li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            });


            //2.分页
            $('.page').pagination({
                pageCount: 3,
                jump: true,
                prevContent: '上一页',
                nextContent: '下一页',
                callback: function(api) {
                    console.log(api.getCurrent());
                    $.ajax({
                        url: 'http://192.168.11.2/JS2008/yangguanggouwu_test/php/listdata.php',
                        data: {
                            page: api.getCurrent()
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        let $strhtml = '<ul>';
                        $.each(data, function(index, value) {
                            $strhtml += `
                                <li>
                                    <a href="detail.html?sid=${value.sid}" target="_blank">
                                        <img src="${value.url}"/>
                                        <p>${value.sid}${value.title}</p>
                                        <span class="price">￥${value.price}</span>
                                        <span>销量${value.sailnumber}</span>
                                    </a>
                                </li>
                            `;
                        });
                        $strhtml += '</ul>';
                        $list.html($strhtml);

                        //将页面的li元素加载到两个数组中
                        $('.-list li').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });
                    });
                }

            });


            //3.排序
            // 默认
            $('button').eq(0).on('click', function() {
                $.each(array_default, function(index, value) {
                    $('.-list ul').append(value);
                });
                return;
            });
            // 升序
            $('button').eq(2).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html().substring(1)); //取上个价格
                        next = parseFloat(array[j + 1].find('.price').html().substring(1)); //下一个的价格
                        //通过价格的判断，改变的是数组li的位置。
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }

                $.each(array, function(index, value) {
                    $('.-list ul').append(value);
                });
            });
            //降序
            $('button').eq(3).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html().substring(1)); //取上个价格
                        next = parseFloat(array[j + 1].find('.price').html().substring(1)); //下一个的价格
                        //通过价格的判断，改变的是数组li的位置。
                        if (prev < next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }

                $.each(array, function(index, value) {
                    $('.-list ul').append(value);
                });
            });
        }(jQuery);
    })
})