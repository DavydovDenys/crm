import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
	connect() {
		// this.element.append(document.createElement('div').textContent('test'))
		// console.log(this.element)
		console.log('Hello from Hello controller!')
	}

	greet() {
		console.log(this.element)
	}
}
