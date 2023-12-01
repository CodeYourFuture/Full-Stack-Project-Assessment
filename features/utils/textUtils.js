import getDriver from "./driverSetup";
import { until, By } from "selenium-webdriver";

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// helper utility to find a piece of text inside the browser
async function findByText(text, timeout, parent) {
	timeout ||= 20000;
	if (parent) {
		return await parent.findElement(By.xpath(`//*[text()[contains(.,'${text}')]]`));
	} else {
		return await getDriver().wait(
			until.elementLocated(By.xpath(`//*[text()[contains(.,'${text}')]]`)),
			timeout
		);
	}
}

// helper utility to wait for text to disappear
async function waitForTextToDisappear(text, timeout) {
	try {
		while (timeout > 0) {
			await findByText(text, 1000);
			await wait(1000);
			timeout -= 1000;
		}
		expect(true).toBe(false);
	} catch (error) {
		expect(error.name).toBe("TimeoutError");
	}
}


export { findByText, waitForTextToDisappear };
