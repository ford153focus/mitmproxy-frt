setTimeout(() => {
    document
        .evaluate("//*[text()='����������']", document)
        .iterateNext()
        .parentElement.parentElement.parentElement.parentElement
        .nextElementSibling
        .remove();

    document
        .evaluate("//*[text()='����������']", document)
        .iterateNext()
        .parentElement.parentElement.parentElement.parentElement
        .remove();

    document
        .evaluate("//*[text()='��������� �����������']", document)
        .iterateNext()
        .parentElement.parentElement.parentElement.parentElement
        .nextElementSibling
        .remove();

    document
        .evaluate("//*[text()='��������� �����������']", document)
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
