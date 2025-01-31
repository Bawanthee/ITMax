window.onload = function () {
	
	var mobileMenu = document.querySelector(".mobile-menu");
	var mobileMenuBtn = document.getElementById("mobile-menu-button");
	var mobileCloseBtn = document.getElementById("mobile-close-button");
	var overlay = document.getElementById("overlay");
	var dropdownBtns = document.querySelectorAll("[data-dropdown]");
	var mobileDropdownBtns = document.querySelectorAll(
		"[data-mobile-dropdown]"
	);

	// Mobile menu toggle function
	function toggleMobileMenu() {
		if (mobileMenu.classList.contains("show")) {
			mobileMenu.classList.remove("show");
			overlay.classList.remove("show");
			document.body.style.overflow = "";
		} else {
			mobileMenu.classList.add("show");
			overlay.classList.add("show");
			document.body.style.overflow = "hidden";
		}
	}

	// Add click events for mobile menu
	if (mobileMenuBtn) {
		mobileMenuBtn.onclick = toggleMobileMenu;
	}
	if (mobileCloseBtn) {
		mobileCloseBtn.onclick = toggleMobileMenu;
	}
	if (overlay) {
		overlay.onclick = toggleMobileMenu;
	}

	// Handle desktop dropdowns
	for (var i = 0; i < dropdownBtns.length; i++) {
		(function (btn) {
			var dropdownId = btn.getAttribute("data-dropdown");
			var dropdown = document.getElementById(dropdownId + "-dropdown");
			var icon = btn.querySelector(".fa-chevron-down");

			btn.onclick = function (e) {
				e = e || window.event;
				if (e.stopPropagation) {
					e.stopPropagation();
				} else {
					e.cancelBubble = true;
				}

				// Close all other dropdowns first
				for (var j = 0; j < dropdownBtns.length; j++) {
					var otherId = dropdownBtns[j].getAttribute("data-dropdown");
					var otherDropdown = document.getElementById(
						otherId + "-dropdown"
					);
					var otherIcon =
						dropdownBtns[j].querySelector(".fa-chevron-down");
					if (otherDropdown !== dropdown) {
						otherDropdown.classList.remove("show");
						if (otherIcon) {
							otherIcon.style.transform = "";
						}
					}
				}

				// Toggle current dropdown
				if (dropdown.classList.contains("show")) {
					dropdown.classList.remove("show");
					if (icon) {
						icon.style.transform = "";
					}
				} else {
					dropdown.classList.add("show");
					if (icon) {
						icon.style.transform = "rotate(180deg)";
					}
				}
			};
		})(dropdownBtns[i]);
	}

	// Handle mobile dropdowns
	for (var i = 0; i < mobileDropdownBtns.length; i++) {
		(function (btn) {
			var dropdownId = btn.getAttribute("data-mobile-dropdown");
			var dropdown = document.getElementById(dropdownId + "-dropdown");
			var icon = btn.querySelector(".fa-chevron-down");

			btn.onclick = function () {
				if (dropdown.classList.contains("hidden")) {
					dropdown.classList.remove("hidden");
					if (icon) {
						icon.style.transform = "rotate(180deg)";
					}
				} else {
					dropdown.classList.add("hidden");
					if (icon) {
						icon.style.transform = "";
					}
				}
			};
		})(mobileDropdownBtns[i]);
	}

	// Close dropdowns when clicking outside
	document.onclick = function () {
		for (var i = 0; i < dropdownBtns.length; i++) {
			var dropdownId = dropdownBtns[i].getAttribute("data-dropdown");
			var dropdown = document.getElementById(dropdownId + "-dropdown");
			var icon = dropdownBtns[i].querySelector(".fa-chevron-down");

			if (dropdown.classList.contains("show")) {
				dropdown.classList.remove("show");
				if (icon) {
					icon.style.transform = "";
				}
			}
		}
	};

	// Handle window resize
	var resizeTimer;
	window.onresize = function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			if (window.innerWidth >= 768) {
				mobileMenu.classList.remove("show");
				overlay.classList.remove("show");
				document.body.style.overflow = "";
			}
		}, 250);
	};
};