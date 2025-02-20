create TRIGGER newtweet after INSERT on tweet
BEGIN 
	UPDATE author set latestUpdate =DATETIME('now') where id=new.authorId;
END;


create TRIGGER updatetweet after update on tweet
BEGIN 
	UPDATE author set latestUpdate =DATETIME('now') where id=new.authorId;
END;


--select DATETIME ('now') 
