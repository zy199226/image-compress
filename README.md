# 图片压缩

- 主要用于上传图片时的压缩
- 不兼容 IE
- 压缩尺寸（例如 width: 1600px 压缩至 width: 800px）
- 压缩大小（例如 2mb 的图片压缩至 1mb，其实也是通过改变尺寸来控制大小，只是这里主要控制大小，图片尺寸由计算结果得出）
- 转换图片格式，目前只支持 png、jpeg、webp

## 简介

浏览器应该是不能直接去压缩图片的，如果可以就当我孤陋寡闻吧。<br>
这里主要是通过改变图片的尺寸去减小图片的占用空间，例如我要把图片保持在 1mb 以下，可能会把 1000 x 1000 图片缩小到 800 x 800，但是这里压缩的图片绝对清晰，这个东西的目的也是图片清晰，占用空间符合后端的标准，图片尺寸尽可能的大。<br>
这里也有问题没有解决，就是我可能设定压缩至 100kb以下，最后出来的图片可能在 160kb 左右，所以这里需要你手动测试一下压缩误差，调整设定的数值，来达到自己的压缩目标。（我有其他任务，这个就暂时先这样吧，以后可能会完善这个地方）

## 用法

```
<script type="text/javascript">
    document.querySelector('input').onchange = function () {
        this.compress({
            width: 600, //按比例去压缩的，这里宽为 600px，这个优先级比 size 高，如果只想压缩大小，请去掉这个
            size: 600, //压缩图片大小，这里为 600kb，十分不准确，请手动调整目标值
            format: 'jpeg' //压缩后图片的格式（png、jpeg、webp），如果只想转换图片格式，请去掉 width 并把 size 设定为不可能的值（例如 10240000），这样就不会去管是否压缩了
        }).then(function (url) { //返回的图片 url 字符串，可以直接放入 <img> src 使用
            var img = new Image();
            img.src = url;
            document.querySelector('.pic').appendChild(img);
        });
    };
</script>
```
