class TerminalCarousel {
    constructor(container, writeInterval=100, eraseInterval=10, waitToErase=1500, waitToWrite=200) {
        this.container = container;
        this.terminal = this.container.find('.terminal');
        this.index = 0;
        this.textLength = 0;

        this.writeInterval = writeInterval;
        this.eraseInterval = eraseInterval;
        this.waitToErase = waitToErase;
        this.waitToWrite = waitToWrite;

        this.write();
    }

    getChildren() {
        return this.container.find('.content p').filter(function() {
            return $(this).text().trim().length > 0; 
        });
    }

    write() {
        let text = this.getChildren().eq(this.index).text();
        setTimeout(() => {
            this.terminal.text(text.substr(0, this.textLength));
            this.textLength++;

            if (this.textLength <= text.length) {
                this.write();
            } else {
                this.terminal.addClass('blinking');
                setTimeout(() => this.erase(), this.waitToErase);
            }
        }, this.writeInterval);
    }

    erase() {
        this.terminal.removeClass('blinking');
        let text = this.getChildren().eq(this.index).text();
        setTimeout(() => {
            this.terminal.text(text.substr(0, this.textLength));
            this.textLength--;

            if (this.textLength >= 0) {
                this.erase();
            } else {
                this.index = (this.index + 1)%this.getChildren().length;
                setTimeout(() => this.write(), this.waitToWrite);
            }
        }, this.eraseInterval);
    }
}

