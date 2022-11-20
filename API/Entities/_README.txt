

// ------- Nullable definition

* If type is: int, float, DateTime (any object)...  ->  nullable=false is setted by default
* If type is: string -> nullable=true is setted by default -> we have to specify the [Required] directive

// ------- Sending Dtos to client with required directive

* If we want to throw error message when int, float, DateTime... The [Required] directive isn't enough we also have to add question mark ?
Otherwise the marked field will get defaults values e.g. 0.0 (when not specified) instead of throw error

[Required]
public float? CostNet { get; set; }
[Required]
public float? CostGross { get; set; }

* With string type [Required] is enough

// ------- Lifehack with UpdateDto 

When we gets data to update, automatically we will update them via current date

public DateTime UpdatedAt { get; set; } = DateTime.Now;

