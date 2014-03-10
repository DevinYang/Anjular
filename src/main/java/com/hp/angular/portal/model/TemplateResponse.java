package com.hp.angular.portal.model;

public class TemplateResponse<R> {
	private R content;
	private Boolean isSuccess;
	private String message;

	public TemplateResponse(R response, Boolean isSuccess, String message) {
		this.content = response;
		this.isSuccess = isSuccess;
		this.message = message;
	}

	public R getContent() {
		return content;
	}

	public void setContent(R content) {
		this.content = content;
	}

	public Boolean getIsSuccess() {
		return isSuccess;
	}

	public void setIsSuccess(Boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
