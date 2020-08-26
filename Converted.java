import java.util.List;

public class Converted
{
    private String about;
    private int created;
    private String id;
    private int likes;
    private List<int> submitted;
    public void setAbout(String about){
        this.about = about;
    }
    public String getAbout(){
        return about;
    }
    public void setCreated(int created){
        this.created = created;
    }
    public int getCreated(){
        return created;
    }
    public void setId(String id){
        this.id = id;
    }
    public String getId(){
        return id;
    }
    public void setLikes(int likes){
        this.likes = likes;
    }
    public int getLikes(){
        return likes;
    }
    public void setSubmitted(List<int> submitted){
        this.submitted = submitted;
    }
    public List<int> getSubmitted(){
        return submitted;
    }
}
