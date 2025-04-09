<template>
    <div class="order-placed-content">
        <div class="order-placed-icon-text">
            <img src="/assets/order-placed-icon.svg" alt="Order Placed" class="order-placed-icon"/>
            <h1>Order Placed</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderPlaced',
};
</script>

<style scoped>
.order-placed-content {
    text-align: center;
}

.order-placed-icon-text {
    display: flex;
    align-items: center;
    justify-content: center;
}

.order-placed-icon {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}

h1 {
    font-size: 3rem;
    color: #836953;
    margin: 0;
}
</style>
