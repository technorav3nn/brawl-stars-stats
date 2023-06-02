(async () => {
    const res = await fetch("https://api.brawlapi.com/v1/graphs/player/2YQ080UU", {
        headers: {
            Authorization:
                "y3@b$#MgW7!#L4@yX#&3*K#$qCYWu7HU6TL6f4jrLx9Y*PRRuw8^vU4k8HynZ%jN2VJRScD$px9gj85L8Y8JkvXe*Uy3Lh5NpKj&jtfz$LoiNp^H3C97v@Q!R7NJ*iHRRPBkxGZHhec@9eb53@TWpT^bAH^4r&VxNwvp4y!3@@x7Y@fKgbTTV7!Y6@G9fr5NENZbuE84#Wgpy254ZB!mX*83KuX#b!5BMh2F!G9#5Z*p2psC9PpDT5&E4^4J5Juw",
            // spoofing user agent
            // "User-Agent":
            //     "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
            // // spoofing referer
            // Referer: "https://brawlapi.com/",
            // // spoofing origin
            // Origin: "https://brawlapi.com/",
            // // spoofing host
            // Host: "api.brawlapi.com",
        },
    });

    const data = await res.json();
    // eslint-disable-next-line no-restricted-syntax
    console.log(data.brawlers["16000000"].number);
})();
