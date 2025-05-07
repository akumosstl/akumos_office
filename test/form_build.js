class FormBuild {

    create(type, attrs) {
        let e = document.createElement(type);
        attrs.array.forEach((value, key) => {
            e.setAttribute(key, value)
        });

        return e
    }

}