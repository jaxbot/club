// Quick 'n dirty™
if (!window.Bastide) window.Bastide ={};
Bastide.mailingList = {
        checkEnter: function(e) {
                e = e || window.event;
                if (e.keyCode === 13) {
                        Bastide.mailingList.subscribe();
                }
        },
        subscribe: function() {
                var email = document.getElementById("signupText").value;
                if (!email) return;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/api/mailinglist/subscribe");
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send(JSON.stringify({ email: email }));
                xhr.onload = function() {
                        if (xhr.status !== 200 || !xhr.responseText || xhr.responseText.indexOf("youtube.com") === -1) {
                                alert("Oh no! The email signup API seems to be down. Shoot us an email or let us know on Facebook\nHow embarassing.");
                                return;
                        }
                        var btn = document.getElementById("signupButton");
                        btn.className += " done";
                        btn.disabled = true;
                        btn.innerHTML = "Done!";
                        setTimeout(function() {
                                document.querySelector(".mailingList").className = "mailingList hidden";
                        }, 1000);
                };
        }
};
