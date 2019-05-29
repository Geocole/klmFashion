
<div id="upModal">
    <update-modal :customer-data-modal='@json($customer)'></update-modal>
</div>
<script>
    var BootstrapCustomFielComponent = Vue.extend({
        template: document.getElementById('updateModal').firstChild.outerHTML,
    });
    var component = new BootstrapCustomFielComponent().$mount("#upModal");
</script>