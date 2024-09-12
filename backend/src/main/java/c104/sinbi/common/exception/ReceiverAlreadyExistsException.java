package c104.sinbi.common.exception;

public class ReceiverAlreadyExistsException extends RuntimeException {

    public ReceiverAlreadyExistsException() {
        super("이미 등록된 계좌입니다.");
    }

    public ReceiverAlreadyExistsException(String message) {
        super(message);
    }
}