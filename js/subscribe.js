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
