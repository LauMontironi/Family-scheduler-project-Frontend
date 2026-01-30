import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events-create.html',
  styleUrl: './events-create.css',
})
export class EventCreate {
  members = input<any[]>([]);

  newEvent: any = {
    member_id: 0,
    title: '',
    type: 'activity',
    start_at: '',
    end_at: '',
    location: '',
    notes: ''
  };

  eventCreated = output<any>();

  handleClick() {
    this.eventCreated.emit(this.newEvent);
    this.newEvent = {
      member_id: 0,
      title: '',
      type: 'activity',
      start_at: '',
      end_at: '',
      location: '',
      notes: ''
    };
  }
}
