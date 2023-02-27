setTimeout(() => {
    document
        .evaluate("//*[text()='Обсуждение']", document)
        .iterateNext()
        .parentElement.parentElement.parentElement.parentElement
        .nextElementSibling
        .remove();

    document
        .evaluate("//*[text()='Обсуждение']", document)
        .iterateNext()
        .parentElement.parentElement.parentElement.parentElement
        .remove();

    document
        .evaluate("//*[text()=' Добавить комментарий']", document)
        .iterateNext()
        .parentElement.parentElement.parentElement.parentElement
        .nextElementSibling
        .remove();

    document
        .evaluate("//*[text()=' Добавить комментарий']", document)
        .iterateNext()
        .parentElement.parentElement.parentElement.parentElement
        .remove();

    document
        .getElementById("lenta_nav2")
        .previousElementSibling.previousElementSibling.previousElementSibling
        .remove();

    document
        .getElementById("lenta_nav2")
        .remove();
}, 50);
