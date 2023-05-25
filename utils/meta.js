export const metaDescriptions = (str) => {
    return [
        { hid: "description", name: "description", content: str },
        { hid: "twitter:description", name: "twitter:description", content: str },
        { hid: "og:description", property: "og:description", content: str },
    ];
};

export const metaTitles = (str) => {
    return [
        { hid: "twitter:title", name: "twitter:title", content: str },
        { hid: "og:title", property: "og:title", content: str },
    ];
};

export const metaImages = (str) => {
    return [
        { hid: "twitter:image", name: "twitter:image", content: str },
        { hid: "og:image", property: "og:image", content: str },
    ];
};

export const metaKeywords = (str) => {
    return [{ hid: "keywords", name: "keywords", content: str }];
};

export const metaTwitterCard = (str) => {
    return [{ hid: "twitter:card", name: "twitter:card", content: str }];
};
